-- Create fitness goal enum type for dropdown options
create type fitness_goal_type as enum (
  'Strength Training',
  'Cardio',
  'Weight Loss',
  'Flexibility',
  'Endurance',
  'Other'
);

-- Create waitlist table
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,       -- Unique user id
  email text unique not null,                          -- Email (required)
  first_name text,                                     -- Optional (null at first)
  last_name text,                                      -- Optional (null at first)
  fitness_goal fitness_goal_type,                      -- Enum (must match dropdown option)
  other_fitness_goal text,                             -- Optional text when "Other" is selected
  inserted_at timestamp with time zone default now()   -- When they joined
);

-- Enable Row-Level Security (RLS)
alter table public.waitlist enable row level security;

-- Policy: Allow inserting new emails
create policy "Allow insert new email"
on public.waitlist
for insert
with check (true);

-- Policy: Allow users to update their own row by email
create policy "Allow update own row"
on public.waitlist
for update
using (auth.uid() is not null);

-- Add index on email for faster lookups
create index if not exists idx_waitlist_email on public.waitlist(email);
