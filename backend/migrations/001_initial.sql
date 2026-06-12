-- Kairos Employee Management System - Initial Schema
-- PostgreSQL migration (quoted identifiers preserve CamelCase)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- MASTER DATA TABLES
-- ============================================================

CREATE TABLE "skills" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "skill_name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "bands" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "band_name" VARCHAR(255) NOT NULL,
  "minimum_ctc" DECIMAL(12,2),
  "maximum_ctc" DECIMAL(12,2),
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "designations" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "designation_name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "job_types" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "job_type_name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "domains" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "domain_name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "office_locations" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "office_location_name" VARCHAR(255) NOT NULL,
  "address" TEXT,
  "city" VARCHAR(255),
  "state" VARCHAR(255),
  "country" VARCHAR(255),
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "holidays" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "holiday_name" VARCHAR(255) NOT NULL,
  "holiday_date" DATE NOT NULL,
  "location_id" UUID REFERENCES "office_locations"("id"),
  "is_optional" BOOLEAN DEFAULT FALSE,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "clients" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "client_name" VARCHAR(255) NOT NULL,
  "client_code" VARCHAR(100),
  "contact_person" VARCHAR(255),
  "contact_email" VARCHAR(255),
  "contact_phone" VARCHAR(50),
  "address" TEXT,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "client_onsite_locations" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "client_id" UUID REFERENCES "clients"("id") ON DELETE CASCADE,
  "location_name" VARCHAR(255),
  "address" TEXT,
  "city" VARCHAR(255),
  "state" VARCHAR(255),
  "country" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "employee_types" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee_type_name" VARCHAR(255) NOT NULL,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "leave_types" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "leave_type_name" VARCHAR(255) NOT NULL,
  "leave_code" VARCHAR(50),
  "max_days" DECIMAL(5,1),
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- LOCATION MASTER
-- ============================================================

CREATE TABLE "countries" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "states" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "country_id" UUID REFERENCES "countries"("id") ON DELETE CASCADE,
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "cities" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "state_id" UUID REFERENCES "states"("id") ON DELETE CASCADE,
  "name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- EMPLOYEES
-- ============================================================

CREATE TABLE "employees" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255),
  "role" VARCHAR(50) DEFAULT 'EMPLOYEE',
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  "number" VARCHAR(50),
  "gender" VARCHAR(20),
  "DOB" DATE,
  "DOJ" DATE,
  "employeeID" VARCHAR(100) UNIQUE,
  "designation" UUID REFERENCES "designations"("id"),
  "band" UUID REFERENCES "bands"("id"),
  "employeeType" UUID REFERENCES "employee_types"("id"),
  "CTC" DECIMAL(12,2),
  "Status" VARCHAR(20) DEFAULT 'ACTIVE',
  "skill" TEXT,
  "workMode" VARCHAR(50),
  "employedBy" VARCHAR(255),
  "ManagerName_id" UUID REFERENCES "employees"("id"),
  "ManagerName_name" VARCHAR(255),
  "productType" VARCHAR(255),
  "employeeCoordinates" VARCHAR(255),
  "Client_loc" VARCHAR(255),
  "ACNo" VARCHAR(100),
  "Bank_Name" VARCHAR(255),
  "IFSCCode" VARCHAR(50),
  "address1" TEXT,
  "address2" TEXT,
  "country" UUID REFERENCES "countries"("id"),
  "state" UUID REFERENCES "states"("id"),
  "city" UUID REFERENCES "cities"("id"),
  "Zip" VARCHAR(20),
  "currentAddress1" TEXT,
  "currentAddress2" TEXT,
  "currentcountry" UUID REFERENCES "countries"("id"),
  "currentstate" UUID REFERENCES "states"("id"),
  "currentcity" UUID REFERENCES "cities"("id"),
  "currentZIP" VARCHAR(20),
  "UANNo" VARCHAR(100),
  "AadhaarNo" VARCHAR(20),
  "profile_img" TEXT,
  "file_path" TEXT,
  "refresh_token" TEXT,
  "reset_token" TEXT,
  "reset_token_expires" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PROJECTS
-- ============================================================

CREATE TABLE "projects" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "project_name" VARCHAR(255) NOT NULL,
  "project_code" VARCHAR(100),
  "client_id" UUID REFERENCES "clients"("id"),
  "domain_id" UUID REFERENCES "domains"("id"),
  "start_date" DATE,
  "end_date" DATE,
  "description" TEXT,
  "status" VARCHAR(20) DEFAULT 'ACTIVE',
  "created_by" UUID REFERENCES "employees"("id"),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PROJECT RESOURCES
-- ============================================================

CREATE TABLE "project_resources" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "project_id" UUID REFERENCES "projects"("id") ON DELETE CASCADE,
  "employee_id" UUID REFERENCES "employees"("id"),
  "role" VARCHAR(255),
  "allocation_percentage" DECIMAL(5,2),
  "start_date" DATE,
  "end_date" DATE,
  "billing_rate" DECIMAL(12,2),
  "currency" VARCHAR(10) DEFAULT 'INR',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- COST INCURRED
-- ============================================================

CREATE TABLE "cost_incurred" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "project_id" UUID REFERENCES "projects"("id") ON DELETE CASCADE,
  "cost_type" VARCHAR(255),
  "amount" DECIMAL(12,2),
  "description" TEXT,
  "incurred_date" DATE,
  "created_by" UUID REFERENCES "employees"("id"),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TIMESHEET
-- ============================================================

CREATE TABLE "timesheet_entries" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee_id" UUID REFERENCES "employees"("id"),
  "date" DATE NOT NULL,
  "jobTypeId" UUID REFERENCES "job_types"("id"),
  "projectId" UUID REFERENCES "projects"("id"),
  "activityId" VARCHAR(255),
  "startTime" TIME,
  "endTime" TIME,
  "noOfHours" DECIMAL(5,2),
  "comments" TEXT,
  "status" VARCHAR(20) DEFAULT 'SAVED',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TIMESHEET APPROVAL
-- ============================================================

CREATE TABLE "timesheet_approvals" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "timesheet_entry_id" UUID REFERENCES "timesheet_entries"("id") ON DELETE CASCADE,
  "approver_id" UUID REFERENCES "employees"("id"),
  "status" VARCHAR(20),
  "comments" TEXT,
  "rating" INTEGER,
  "approved_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- LEAVE REQUESTS
-- ============================================================

CREATE TABLE "leave_requests" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee_id" UUID REFERENCES "employees"("id"),
  "leaveMasterId" UUID REFERENCES "leave_types"("id"),
  "fromDate" DATE NOT NULL,
  "toDate" DATE NOT NULL,
  "fromSession" VARCHAR(20) DEFAULT 'FULL_DAY',
  "toSession" VARCHAR(20) DEFAULT 'FULL_DAY',
  "noOfDays" DECIMAL(5,1),
  "comments" TEXT,
  "cc" TEXT,
  "file_path" TEXT,
  "status" VARCHAR(20) DEFAULT 'SAVED',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- LEAVE BALANCE
-- ============================================================

CREATE TABLE "leave_balances" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee_id" UUID REFERENCES "employees"("id"),
  "leave_type_id" UUID REFERENCES "leave_types"("id"),
  "total_days" DECIMAL(5,1) DEFAULT 0,
  "used_days" DECIMAL(5,1) DEFAULT 0,
  "remaining_days" DECIMAL(5,1) DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("employee_id", "leave_type_id")
);

-- ============================================================
-- LEAVE APPROVAL
-- ============================================================

CREATE TABLE "leave_approvals" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "leave_request_id" UUID REFERENCES "leave_requests"("id") ON DELETE CASCADE,
  "approver_id" UUID REFERENCES "employees"("id"),
  "status" VARCHAR(20),
  "comments" TEXT,
  "approved_at" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- APPROVER HIERARCHY
-- ============================================================

CREATE TABLE "approver_hierarchy" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee_id" UUID REFERENCES "employees"("id"),
  "approver_id" UUID REFERENCES "employees"("id"),
  "approval_type" VARCHAR(50) DEFAULT 'TIMESHEET',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("employee_id", "approver_id", "approval_type")
);

-- ============================================================
-- RATINGS
-- ============================================================

CREATE TABLE "ratings" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee_id" UUID REFERENCES "employees"("id"),
  "manager_id" UUID REFERENCES "employees"("id"),
  "rating" INTEGER CHECK ("rating" >= 1 AND "rating" <= 5),
  "comments" TEXT,
  "rating_period" VARCHAR(50),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ACTIVITY HISTORY
-- ============================================================

CREATE TABLE "activity_history" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "employee_id" UUID REFERENCES "employees"("id"),
  "activity_type" VARCHAR(100),
  "activity_data" JSONB,
  "date" DATE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- REPORTS
-- ============================================================

CREATE TABLE "reports" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "type" VARCHAR(50),
  "parameters" JSONB,
  "file_path" TEXT,
  "generated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "generated_by" UUID REFERENCES "employees"("id")
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX "idx_employees_email" ON "employees"("email");
CREATE INDEX "idx_employees_employeeid" ON "employees"("employeeID");
CREATE INDEX "idx_employees_manager" ON "employees"("ManagerName_id");
CREATE INDEX "idx_timesheet_employee_date" ON "timesheet_entries"("employee_id", "date");
CREATE INDEX "idx_timesheet_status" ON "timesheet_entries"("status");
CREATE INDEX "idx_leave_employee" ON "leave_requests"("employee_id");
CREATE INDEX "idx_leave_status" ON "leave_requests"("status");
CREATE INDEX "idx_leave_dates" ON "leave_requests"("fromDate", "toDate");
CREATE INDEX "idx_project_client" ON "projects"("client_id");
CREATE INDEX "idx_project_resources_project" ON "project_resources"("project_id");
CREATE INDEX "idx_project_resources_employee" ON "project_resources"("employee_id");
CREATE INDEX "idx_ratings_manager" ON "ratings"("manager_id");
CREATE INDEX "idx_ratings_employee" ON "ratings"("employee_id");
CREATE INDEX "idx_activity_employee" ON "activity_history"("employee_id");
CREATE INDEX "idx_approver_hierarchy_employee" ON "approver_hierarchy"("employee_id");
CREATE INDEX "idx_approver_hierarchy_approver" ON "approver_hierarchy"("approver_id");
