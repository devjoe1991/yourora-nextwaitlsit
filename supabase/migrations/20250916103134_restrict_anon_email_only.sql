-- Drop existing policies
drop policy if exists "Allow anon email signup" on public.waitlist;
drop policy if exists "Allow service role updates" on public.waitlist;
drop policy if exists "Allow authenticated user updates" on public.waitlist;
drop policy if exists "Prevent data reading" on public.waitlist;

-- Allow anon role to INSERT new rows, but ONLY with email field
-- All other fields (first_name, last_name, fitness_goal) must be NULL
create policy "Allow anon email only insert"
on public.waitlist
for insert
to anon
with check (
  email is not null 
  and first_name is null 
  and last_name is null 
  and fitness_goal is null
);

-- Allow service_role to UPDATE any row (for profile completion)
create policy "Allow service role updates"
on public.waitlist
for update
to service_role
using (true)
with check (true);

-- Allow authenticated users to update their own profile (future use)
create policy "Allow authenticated user updates"
on public.waitlist
for update
to authenticated
using (true)
with check (true);

-- Prevent reading data for security
create policy "Prevent data reading"
on public.waitlist
for select
using (false);
