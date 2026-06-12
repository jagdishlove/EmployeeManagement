const db = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { signToken, verifyToken } = require('../utils/jwt');
const { success, error } = require('../utils/response');
const { v4: uuidv4 } = require('uuid');

function toProfile(row) {
  return {
    id: row.id,
    email: row.email,
    firstName: row.firstName,
    lastName: row.lastName,
    role: row.role,
    employeeID: row.employeeID,
  };
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return error(res, 'Email and password are required');
    }

    const result = await db.query('SELECT * FROM employees WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return error(res, 'Invalid email or password', 401);
    }

    const employee = result.rows[0];
    if (!employee.password_hash) {
      return error(res, 'Account not set up yet. Use forgot password.', 400);
    }

    const valid = await comparePassword(password, employee.password_hash);
    if (!valid) {
      return error(res, 'Invalid email or password', 401);
    }

    if (employee.Status !== 'ACTIVE') {
      return error(res, 'Account is inactive', 403);
    }

    const tokenPayload = {
      id: employee.id,
      email: employee.email,
      role: employee.role,
      employeeID: employee.employeeID,
    };
    const accessToken = signToken(tokenPayload);

    const profile = toProfile(employee);

    return success(res, {
      user: { id: employee.id, email: employee.email, role: employee.role },
      session: { access_token: accessToken, token_type: 'bearer' },
      profile,
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
      return error(res, 'Email and password are required');
    }

    const existing = await db.query('SELECT id FROM employees WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return error(res, 'Email already registered', 409);
    }

    const passwordHash = await hashPassword(password);
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO employees (id, email, password_hash, "firstName", "lastName", role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [id, email, passwordHash, firstName || '', lastName || '', 'EMPLOYEE']
    );

    const employee = result.rows[0];
    const profile = toProfile(employee);

    return success(res, { user: { id: employee.id, email: employee.email, role: employee.role }, profile }, 201);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return success(res, { message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

exports.session = async (req, res, next) => {
  try {
    if (!req.user) {
      return success(res, { session: null, profile: null });
    }

    const result = await db.query('SELECT * FROM employees WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return success(res, { session: null, profile: null });
    }

    const employee = result.rows[0];
    const accessToken = signToken({ id: employee.id, email: employee.email, role: employee.role, employeeID: employee.employeeID });

    return success(res, {
      session: { access_token: accessToken, token_type: 'bearer', user: { id: employee.id } },
      profile: toProfile(employee),
    });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    if (!req.user) {
      return error(res, 'Not authenticated', 401);
    }

    const result = await db.query('SELECT * FROM employees WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) {
      return error(res, 'User not found', 404);
    }

    return success(res, { user: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return error(res, 'Email is required');
    }

    const result = await db.query('SELECT id FROM employees WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return success(res, { otpsealedobject: { message: 'If the email exists, a reset link has been sent' } });
    }

    // In production, send email with reset link/token
    const resetToken = uuidv4();
    const expires = new Date(Date.now() + 3600000); // 1 hour
    await db.query(
      'UPDATE employees SET reset_token = $1, reset_token_expires = $2 WHERE email = $3',
      [resetToken, expires, email]
    );

    return success(res, { otpsealedobject: { resetToken, message: 'Reset token generated' } });
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return error(res, 'Token and new password are required');
    }

    const result = await db.query(
      'SELECT id FROM employees WHERE reset_token = $1 AND reset_token_expires > NOW()',
      [token]
    );

    if (result.rows.length === 0) {
      return error(res, 'Invalid or expired reset token', 400);
    }

    const passwordHash = await hashPassword(newPassword);
    await db.query(
      'UPDATE employees SET password_hash = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2',
      [passwordHash, result.rows[0].id]
    );

    return success(res, { message: 'Password reset successfully' });
  } catch (err) {
    next(err);
  }
};

exports.otp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return error(res, 'Email is required');
    }

    // In production, send actual OTP via email/SMS
    const otpSealed = uuidv4();
    return success(res, { otpsealedobject: { otp: otpSealed, message: 'OTP sent' } });
  } catch (err) {
    next(err);
  }
};
