-- Drop existing policies
drop policy if exists "Allow insert new email" on public.waitlist;
drop policy if exists "Allow update own row" on public.waitlist;

-- Create new policies that allow anonymous access for waitlist functionality
-- Allow anyone to insert new emails (for waitlist signup)
create policy "Allow anonymous insert"
on public.waitlist
for insert
with check (true);

-- Allow anyone to update rows by email (for profile completion)
create policy "Allow anonymous update by email"
on public.waitlist
for update
using (true)
with check (true);
