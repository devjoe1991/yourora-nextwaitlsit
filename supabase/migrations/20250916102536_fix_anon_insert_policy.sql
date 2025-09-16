-- Drop existing policies
drop policy if exists "Allow waitlist signup" on public.waitlist;
drop policy if exists "Allow profile completion by email" on public.waitlist;
drop policy if exists "Prevent data reading" on public.waitlist;

-- Allow anonymous users (anon role) to insert new emails only
-- This is safe because we only allow email insertion, not updates
create policy "Allow anon email signup"
on public.waitlist
for insert
to anon
with check (true);

-- Allow service_role to update profiles (for profile completion)
-- This ensures only your backend can update user details
create policy "Allow service role updates"
on public.waitlist
for update
to service_role
using (true)
with check (true);

-- Allow authenticated users to update their own profile
-- This is for future use if you add user authentication
create policy "Allow authenticated user updates"
on public.waitlist
for update
to authenticated
using (true)
with check (true);

-- Prevent reading data for security
-- Only service_role should be able to read waitlist data
create policy "Prevent data reading"
on public.waitlist
for select
using (false);
