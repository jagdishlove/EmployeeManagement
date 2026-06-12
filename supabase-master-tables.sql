-- Master Data Tables for Supabase

-- SKILLS
create table skills (
  id uuid default uuid_generate_v4() primary key,
  skill_name text not null,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- BANDS
create table bands (
  id uuid default uuid_generate_v4() primary key,
  band_name text not null,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- DESIGNATIONS
create table designations (
  id uuid default uuid_generate_v4() primary key,
  designation_name text not null,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- JOB TYPES
create table job_types (
  id uuid default uuid_generate_v4() primary key,
  job_type_name text not null,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- DOMAINS
create table domains (
  id uuid default uuid_generate_v4() primary key,
  domain_name text not null,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- OFFICE LOCATIONS
create table office_locations (
  id uuid default uuid_generate_v4() primary key,
  office_location_name text not null,
  address text,
  city text,
  state text,
  country text,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- HOLIDAYS
create table holidays (
  id uuid default uuid_generate_v4() primary key,
  holiday_name text not null,
  holiday_date date not null,
  location_id uuid references office_locations(id),
  is_optional boolean default false,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CLIENTS
create table clients (
  id uuid default uuid_generate_v4() primary key,
  client_name text not null,
  client_code text,
  contact_person text,
  contact_email text,
  contact_phone text,
  address text,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CLIENT ONSITE LOCATIONS
create table client_onsite_locations (
  id uuid default uuid_generate_v4() primary key,
  client_id uuid references clients(id),
  location_name text not null,
  address text,
  city text,
  state text,
  country text,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- EMPLOYEE TYPES
create table employee_types (
  id uuid default uuid_generate_v4() primary key,
  employee_type_name text not null,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- LEAVE TYPES
create table leave_types (
  id uuid default uuid_generate_v4() primary key,
  leave_type_name text not null,
  leave_code text,
  max_days integer default 0,
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Disable RLS for all tables (dev mode)
alter table skills disable row level security;
alter table bands disable row level security;
alter table designations disable row level security;
alter table job_types disable row level security;
alter table domains disable row level security;
alter table office_locations disable row level security;
alter table holidays disable row level security;
alter table clients disable row level security;
alter table client_onsite_locations disable row level security;
alter table employee_types disable row level security;
alter table leave_types disable row level security;

-- Grant permissions
grant all on skills to anon, authenticated, service_role;
grant all on bands to anon, authenticated, service_role;
grant all on designations to anon, authenticated, service_role;
grant all on job_types to anon, authenticated, service_role;
grant all on domains to anon, authenticated, service_role;
grant all on office_locations to anon, authenticated, service_role;
grant all on holidays to anon, authenticated, service_role;
grant all on clients to anon, authenticated, service_role;
grant all on client_onsite_locations to anon, authenticated, service_role;
grant all on employee_types to anon, authenticated, service_role;
grant all on leave_types to anon, authenticated, service_role;