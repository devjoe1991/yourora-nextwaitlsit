-- Re-enable RLS for the waitlist table
alter table public.waitlist enable row level security;

-- Drop any existing policies
drop policy if exists "Allow anon email only insert" on public.waitlist;
drop policy if exists "Allow service role updates" on public.waitlist;
drop policy if exists "Allow authenticated user updates" on public.waitlist;
drop policy if exists "Prevent data reading" on public.waitlist;

-- Policy 1: Allow anon role to INSERT new rows with email only
-- This ensures anonymous users can only sign up with their email
create policy "anon_can_insert_email_only"
on public.waitlist
for insert
to anon
with check (
  email is not null 
  and first_name is null 
  and last_name is null 
  and fitness_goal is null
  and other_fitness_goal is null
);

-- Policy 2: Allow service_role to UPDATE any row
-- This allows your backend to complete user profiles
create policy "service_role_can_update"
on public.waitlist
for update
to service_role
using (true)
with check (true);

-- Policy 3: Allow service_role to SELECT data (for admin operations)
-- This allows your backend to read data when needed
create policy "service_role_can_select"
on public.waitlist
for select
to service_role
using (true);

-- Policy 4: Prevent anon role from reading data
-- This prevents anonymous users from seeing any data
create policy "anon_cannot_select"
on public.waitlist
for select
to anon
using (false);

-- Policy 5: Prevent anon role from updating data
-- This prevents anonymous users from modifying data
create policy "anon_cannot_update"
on public.waitlist
for update
to anon
using (false);

-- Policy 6: Prevent anon role from deleting data
-- This prevents anonymous users from deleting data
create policy "anon_cannot_delete"
on public.waitlist
for delete
to anon
using (false);
