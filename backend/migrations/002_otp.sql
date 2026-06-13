-- OTP table for secure email verification
CREATE TABLE "otps" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" VARCHAR(255) NOT NULL,
  "otp_hash" VARCHAR(255) NOT NULL,
  "purpose" VARCHAR(50) NOT NULL DEFAULT 'LOGIN',
  "expires_at" TIMESTAMP NOT NULL,
  "attempts" INTEGER DEFAULT 0,
  "max_attempts" INTEGER DEFAULT 3,
  "used_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_otps_email" ON "otps"("email");
CREATE INDEX "idx_otps_expires" ON "otps"("expires_at");
