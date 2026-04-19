-- PROFILES table (required for auth)
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  first_name text,
  last_name text,
  employee_id text unique,
  role text default 'USER',
  designation_id uuid,
  band_id uuid,
  office_location_id uuid,
  reporting_manager uuid references profiles(id),
  joining_date date,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Admins can view all profiles
create policy "Admins can view all profiles" on profiles for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'SUPERADMIN')
);