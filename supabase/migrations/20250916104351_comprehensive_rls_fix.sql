-- Drop all existing policies to start fresh
drop policy if exists "anon_can_insert" on public.waitlist;
drop policy if exists "anon_can_insert_email_only" on public.waitlist;
drop policy if exists "service_role_can_update" on public.waitlist;
drop policy if exists "service_role_can_select" on public.waitlist;
drop policy if exists "anon_cannot_select" on public.waitlist;
drop policy if exists "anon_cannot_update" on public.waitlist;
drop policy if exists "anon_cannot_delete" on public.waitlist;

-- Ensure RLS is enabled
alter table public.waitlist enable row level security;

-- Policy 1: Allow anon to insert (this is the key fix)
create policy "anon_insert_policy"
on public.waitlist
for insert
to anon
with check (true);

-- Policy 2: Allow service_role to update
create policy "service_role_update_policy"
on public.waitlist
for update
to service_role
using (true)
with check (true);

-- Policy 3: Allow service_role to select
create policy "service_role_select_policy"
on public.waitlist
for select
to service_role
using (true);

-- Policy 4: Prevent anon from selecting
create policy "anon_no_select_policy"
on public.waitlist
for select
to anon
using (false);

-- Policy 5: Prevent anon from updating
create policy "anon_no_update_policy"
on public.waitlist
for update
to anon
using (false);

-- Policy 6: Prevent anon from deleting
create policy "anon_no_delete_policy"
on public.waitlist
for delete
to anon
using (false);
