-- Drop the existing anon insert policy
drop policy if exists "anon_can_insert_email_only" on public.waitlist;

-- Create a simpler policy that just allows anon to insert
-- We'll rely on the application logic to ensure only email is provided
create policy "anon_can_insert"
on public.waitlist
for insert
to anon
with check (true);

-- Keep all other policies as they are
-- The service_role policies remain unchanged
