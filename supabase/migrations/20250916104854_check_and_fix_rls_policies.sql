-- First, let's check if RLS is enabled and ensure it is
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'waitlist' 
        AND n.nspname = 'public'
        AND c.relrowsecurity = true
    ) THEN
        ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop all existing policies to start completely fresh
DROP POLICY IF EXISTS "anon_insert_policy" ON public.waitlist;
DROP POLICY IF EXISTS "anon_can_insert" ON public.waitlist;
DROP POLICY IF EXISTS "anon_can_insert_email_only" ON public.waitlist;
DROP POLICY IF EXISTS "service_role_update_policy" ON public.waitlist;
DROP POLICY IF EXISTS "service_role_can_update" ON public.waitlist;
DROP POLICY IF EXISTS "service_role_select_policy" ON public.waitlist;
DROP POLICY IF EXISTS "service_role_can_select" ON public.waitlist;
DROP POLICY IF EXISTS "anon_no_select_policy" ON public.waitlist;
DROP POLICY IF EXISTS "anon_cannot_select" ON public.waitlist;
DROP POLICY IF EXISTS "anon_no_update_policy" ON public.waitlist;
DROP POLICY IF EXISTS "anon_cannot_update" ON public.waitlist;
DROP POLICY IF EXISTS "anon_no_delete_policy" ON public.waitlist;
DROP POLICY IF EXISTS "anon_cannot_delete" ON public.waitlist;

-- Policy 1: Allow anon role to INSERT emails only
CREATE POLICY "anon_email_insert"
ON public.waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy 2: Allow service_role to UPDATE any row
CREATE POLICY "service_role_update"
ON public.waitlist
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Policy 3: Allow service_role to SELECT data
CREATE POLICY "service_role_select"
ON public.waitlist
FOR SELECT
TO service_role
USING (true);

-- Policy 4: Prevent anon from SELECT
CREATE POLICY "anon_no_select"
ON public.waitlist
FOR SELECT
TO anon
USING (false);

-- Policy 5: Prevent anon from UPDATE
CREATE POLICY "anon_no_update"
ON public.waitlist
FOR UPDATE
TO anon
USING (false);

-- Policy 6: Prevent anon from DELETE
CREATE POLICY "anon_no_delete"
ON public.waitlist
FOR DELETE
TO anon
USING (false);
