const crypto = require("crypto");

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const SALT = "kairos-seal-v1";

function getKey() {
  return crypto.scryptSync(
    process.env.JWT_SECRET || "fallback-secret-key",
    SALT,
    32,
  );
}

function seal(data) {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const json = JSON.stringify(data);
  let encrypted = cipher.update(json, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return iv.toString("hex") + ":" + authTag + ":" + encrypted;
}

function unseal(token) {
  try {
    const key = getKey();
    const parts = token.split(":");
    if (parts.length !== 3) return null;

    const iv = Buffer.from(parts[0], "hex");
    const authTag = Buffer.from(parts[1], "hex");
    const encrypted = parts[2];

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}

module.exports = { seal, unseal };
