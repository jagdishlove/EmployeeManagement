-- PROFILES table (connects to auth.users)
create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  first_name text,
  last_name text,
  employee_id text unique,
  role text default 'USER' check (role in ('USER', 'ADMIN', 'SUPERADMIN', 'APPROVER', 'LEAVEAPPROVER')),
  designation_id uuid,
  band_id uuid,
  office_location_id uuid,
  reporting_manager uuid references profiles(id),
  joining_date date,
  phone text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;

-- Users can view own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);

-- Users can update own profile
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Function to auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to run on every new signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Indexes for performance
create index idx_profiles_employee_id on profiles(employee_id);
create index idx_profiles_role on profiles(role);
create index idx_profiles_reporting_manager on profiles(reporting_manager);