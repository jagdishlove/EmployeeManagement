-- Kairos Auth - Step 1: Employees table only
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "employees" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255),
  "role" VARCHAR(50) DEFAULT 'EMPLOYEE',
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "Status" VARCHAR(20) DEFAULT 'ACTIVE',
  "profile_img" TEXT,
  "file_path" TEXT,
  "refresh_token" TEXT,
  "reset_token" TEXT,
  "reset_token_expires" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_employees_email" ON "employees"("email");
