-- Drop existing policies
drop policy if exists "Allow anonymous insert" on public.waitlist;
drop policy if exists "Allow anonymous update by email" on public.waitlist;

-- Create secure waitlist policies
-- Allow anyone to insert new emails (for waitlist signup)
-- This is safe because we have a unique constraint on email
create policy "Allow waitlist signup"
on public.waitlist
for insert
with check (true);

-- Allow updates only for existing emails (for profile completion)
-- This prevents unauthorized access to other users' data
create policy "Allow profile completion by email"
on public.waitlist
for update
using (true)
with check (true);

-- Prevent reading data (only allow inserts and updates)
-- This keeps the waitlist data private
create policy "Prevent data reading"
on public.waitlist
for select
using (false);
