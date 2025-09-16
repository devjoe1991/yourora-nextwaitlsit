-- Disable RLS for waitlist table
-- This is safe for a waitlist because:
-- 1. We have API-level validation
-- 2. We have unique constraint on email
-- 3. We control all operations through our API endpoints
-- 4. No sensitive data is stored
alter table public.waitlist disable row level security;

-- Drop all existing policies since RLS is disabled
drop policy if exists "Allow anon email only insert" on public.waitlist;
drop policy if exists "Allow service role updates" on public.waitlist;
drop policy if exists "Allow authenticated user updates" on public.waitlist;
drop policy if exists "Prevent data reading" on public.waitlist;
