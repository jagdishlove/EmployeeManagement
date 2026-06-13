const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_MINUTES = 15;
const MAX_OTP_PER_WINDOW = 3;

function generateOTP() {
  const min = Math.pow(10, OTP_LENGTH - 1);
  const max = Math.pow(10, OTP_LENGTH) - 1;
  return crypto.randomInt(min, max).toString();
}

async function hashOTP(otp) {
  return bcrypt.hash(otp, 10);
}

async function verifyOTP(otp, hash) {
  return bcrypt.compare(otp, hash);
}

async function checkRateLimit(email) {
  const result = await db.query(
    `SELECT COUNT(*) as count FROM otps
     WHERE email = $1
     AND created_at > NOW() - INTERVAL '${RATE_LIMIT_WINDOW_MINUTES} minutes'`,
    [email]
  );
  return parseInt(result.rows[0].count) < MAX_OTP_PER_WINDOW;
}

async function createOTP(email, purpose = 'LOGIN') {
  const allowed = await checkRateLimit(email);
  if (!allowed) {
    return { error: 'Too many OTP requests. Please try again later.' };
  }

  // Invalidate any previous unused OTPs for this email+purpose
  await db.query(
    `UPDATE otps SET used_at = NOW()
     WHERE email = $1 AND purpose = $2 AND used_at IS NULL AND expires_at > NOW()`,
    [email, purpose]
  );

  const otp = generateOTP();
  const otpHash = await hashOTP(otp);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await db.query(
    `INSERT INTO otps (id, email, otp_hash, purpose, expires_at, max_attempts)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [uuidv4(), email, otpHash, purpose, expiresAt, MAX_ATTEMPTS]
  );

  return { otp, expiresAt };
}

async function validateOTP(email, otp, purpose ) {
  const result = await db.query(
    `SELECT * FROM otps
     WHERE email = $1 AND purpose = $2 AND used_at IS NULL AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [email, purpose]
  );

  if (result.rows.length === 0) {
    return { valid: false, reason: 'No valid OTP found. Request a new one.' };
  }

  const record = result.rows[0];

  if (record.attempts >= record.max_attempts) {
    await db.query('UPDATE otps SET used_at = NOW() WHERE id = $1', [record.id]);
    return { valid: false, reason: 'Too many failed attempts. Request a new OTP.' };
  }

  const match = await verifyOTP(otp, record.otp_hash);

  if (!match) {
    await db.query(
      'UPDATE otps SET attempts = attempts + 1 WHERE id = $1',
      [record.id]
    );
    const remaining = record.max_attempts - record.attempts - 1;
    return { valid: false, reason: `Invalid OTP. ${remaining} attempt(s) remaining.` };
  }

  // Mark as used
  await db.query('UPDATE otps SET used_at = NOW(), attempts = attempts + 1 WHERE id = $1', [record.id]);

  return { valid: true };
}

async function cleanupExpiredOTPs() {
  await db.query('DELETE FROM otps WHERE expires_at < NOW() - INTERVAL \'1 day\'');
}

module.exports = { createOTP, validateOTP, generateOTP, cleanupExpiredOTPs };
