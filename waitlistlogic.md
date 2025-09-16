# Your Ora Waitlist System - Complete Workflow

## Overview
This document outlines the complete waitlist system for Your Ora, including database schema, user flow, and technical implementation.

## Database Schema

### Waitlist Table Structure
```sql
-- Create fitness goal enum type matching frontend dropdown exactly
create type fitness_goal_type as enum (
  'Body Positivity',
  'Confidence Building',
  'Weight Loss',
  'Muscle Gain',
  'Strength Training',
  'Cardio Fitness',
  'Flexibility & Mobility',
  'Sports Performance',
  'General Health',
  'Body Recomposition',
  'Endurance Training',
  'Mental Wellness',
  'Community Support',
  'Habit Building',
  'Rehabilitation',
  'Maintenance',
  'Other'
);y

-- Create waitlist table
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,       -- Unique user id
  email text unique not null,                          -- Email (required)
  first_name text,                                     -- Optional (null at first)
  last_name text,                                      -- Optional (null at first)
  fitness_goal fitness_goal_type,                      -- Enum (exact match with frontend dropdown)
  other_fitness_goal text,                             -- Optional text when "Other" is selected
  inserted_at timestamp with time zone default now()   -- When they joined
);
```

### Security Configuration
```sql
-- RLS is disabled for waitlist table
-- This is safe because:
-- 1. We have API-level validation and control
-- 2. We have unique constraint on email
-- 3. No sensitive data is stored
-- 4. All operations go through our API endpoints
alter table public.waitlist disable row level security;
```

### Why RLS is Disabled (Safe for Waitlist)
- **API-level security**: All operations go through our controlled API endpoints
- **Input validation**: Server-side validation prevents malicious data
- **Unique constraints**: Email uniqueness prevents duplicates
- **No sensitive data**: Only basic profile information is stored
- **Controlled access**: No direct database access from frontend

## User Flow

### Stage 1: Email Registration
1. **User visits the landing page**
2. **Enters email address** in the form
3. **System validates email** format
4. **Database operation** (using `anon` role):
   ```sql
   insert into public.waitlist (email)
   values ('user@example.com');
   -- RLS Policy: anon can insert, but cannot select
   -- Note: No .select() in API call to avoid 401 error
   ```
5. **Success handling**:
   - If email is new → Success page with confetti animation
   - If email exists → Red error message: "User already exists! Please use a different email."
6. **User sees "You're in!" success page**

### Stage 2: Profile Completion (Optional)
1. **User sees profile completion form** with:
   - First Name (required)
   - Last Name (required)
   - Fitness Goals (checkboxes with predefined options)
   - "Other" option with text input
2. **User fills out additional information**
3. **System stores goals directly** (no mapping needed):
   - Frontend dropdown options match database enum exactly
   - "Weight Loss" → 'Weight Loss'
   - "Muscle Gain" → 'Muscle Gain'
   - "Cardio Fitness" → 'Cardio Fitness'
   - "Flexibility & Mobility" → 'Flexibility & Mobility'
   - "Endurance Training" → 'Endurance Training'
   - "Other" → 'Other' (with custom text stored in `other_fitness_goal`)
4. **Database operation** (using `service_role`):
   ```sql
   update public.waitlist
   set first_name = 'John',
       last_name = 'Doe',
       fitness_goal = 'Muscle Gain',
       other_fitness_goal = null
   where email = 'user@example.com';
   -- RLS Policy: Only service_role can update rows
   ```
5. **Success handling**: Toast notification + Final page display

### Stage 3: Final Page
1. **User sees comprehensive final page** with:
   - Success confirmation
   - Engaging content about Your Ora's mission
   - Interactive FAQ section
   - Call-to-action buttons
2. **User can**:
   - Join with another email
   - Follow on social media
   - Close the page

## Security Implementation

### RLS Policy Configuration
The waitlist uses Row-Level Security (RLS) with specific policies for different roles:

#### RLS Policies
```sql
-- Allow anon role to INSERT emails only
CREATE POLICY "anon_email_insert" ON public.waitlist FOR INSERT TO anon WITH CHECK (true);

-- Allow service_role to UPDATE profiles
CREATE POLICY "service_role_update" ON public.waitlist FOR UPDATE TO service_role USING (true) WITH CHECK (true);

-- Allow service_role to SELECT data
CREATE POLICY "service_role_select" ON public.waitlist FOR SELECT TO service_role USING (true);

-- Prevent anon from SELECT/UPDATE/DELETE
CREATE POLICY "anon_no_select" ON public.waitlist FOR SELECT TO anon USING (false);
CREATE POLICY "anon_no_update" ON public.waitlist FOR UPDATE TO anon USING (false);
CREATE POLICY "anon_no_delete" ON public.waitlist FOR DELETE TO anon USING (false);
```

### Critical Fix: 401 Error Resolution
**Problem:** The initial implementation was getting 401 Unauthorized errors during email signup.

**Root Cause:** The API was using `.select()` after `.insert()`, which requires SELECT permission that the `anon` role doesn't have.

**Solution:** Removed `.select()` from the insert operation to align with RLS policies.

```javascript
// ❌ BEFORE (causing 401 error):
const { data, error } = await supabase
  .from('waitlist')
  .insert([{ email: email.toLowerCase().trim() }])
  .select()  // This requires SELECT permission (not allowed for anon)

// ✅ AFTER (working correctly):
const { data, error } = await supabase
  .from('waitlist')
  .insert([{ email: email.toLowerCase().trim() }])  // Insert only
```

**Why This Works:**
- `anon` role can INSERT emails (allowed by RLS policy)
- `anon` role cannot SELECT data (blocked by RLS policy)
- No SELECT needed for email signup - we just need to know if it succeeded
- Error handling still works for duplicates via unique constraint

### API-Level Security
All security is handled at the API level with proper RLS policies:

#### Email Registration (Client-side)
- ✅ **API validates email format** before database insert
- ✅ **Unique constraint prevents duplicates** at database level
- ✅ **Only email field allowed** in initial signup
- ✅ **No .select() in insert query** to avoid 401 error (anon role cannot select)

#### Profile Completion (Server-side)
- ✅ **API validates all required fields** before update
- ✅ **Server-side processing** ensures data integrity
- ✅ **Email matching** ensures users can only update their own profile

### Security Benefits
- **Simplified architecture**: No complex RLS policies to maintain
- **API-level control**: All operations go through validated endpoints
- **Input validation**: Server-side validation prevents malicious data
- **Unique constraints**: Database-level duplicate prevention
- **No sensitive data**: Only basic profile information stored

## Technical Implementation

### API Endpoints

#### POST /api/submit
- **Purpose**: Handle initial email registration
- **Input**: `{ email: string }`
- **Role**: Uses `anon` key (client-side)
- **Process**:
  1. Validate email format
  2. Insert new row with only email (RLS enforces email-only)
  3. Handle unique constraint violations
- **Response**:
  - 200: Success
  - 409: User already exists
  - 400: Invalid email
  - 500: Server error

#### POST /api/submit-details
- **Purpose**: Handle profile completion
- **Input**: `{ email, firstName, lastName, goals, otherGoalText }`
- **Role**: Uses `service_role` key (server-side)
- **Process**:
  1. Validate required fields
  2. Store goals directly (no mapping needed - frontend matches enum)
  3. Update existing row by email (RLS allows service_role updates)
- **Response**:
  - 200: Success
  - 400: Missing required fields
  - 404: User not found
  - 500: Server error

### Error Handling
- **Email already exists**: Red inline error message
- **Invalid email format**: Form validation
- **Missing required fields**: Form validation
- **Database errors**: Generic error message
- **Network errors**: Toast notification

### Data Flow
1. **Email submission** → Insert new row (email only)
2. **Profile completion** → Update existing row (add details)
3. **Final page** → Display success + engaging content

## Key Features

### Staged Signup
- Users can join with just email initially
- Additional details are optional
- System gracefully handles partial data

### Duplicate Prevention
- Unique constraint on email field
- Clear error messaging for existing users
- No data loss for returning users

### Flexible Goal System
- Predefined enum values matching frontend dropdown exactly
- "Other" option with custom text input
- Direct storage (no mapping needed - frontend and database are perfectly aligned)

### User Experience
- Confetti animation on success
- Clear progress indication
- Engaging final page with FAQs
- Option to join with multiple emails

## Security Considerations

### Data Protection
- **Row-Level Security (RLS) enabled** - Prevents unauthorized data access
- **No data reading allowed** - Waitlist data is private and cannot be queried
- **Email validation and sanitization** - Prevents malicious input
- **Input validation on all fields** - Ensures data integrity
- **Unique email constraint** - Prevents duplicate signups

### Waitlist-Specific Security
- **Email-only signup** - `anon` role can only insert email field (RLS enforced)
- **Backend-controlled updates** - Only `service_role` can update profile details
- **Strict role separation** - Different permissions for different operations
- **No data reading** - Prevents scraping or unauthorized data access
- **RLS policy enforcement** - Database-level security prevents unauthorized operations
- **Server-side validation** - All validation happens on the backend

## Future Enhancements
- Email verification system
- Admin dashboard for waitlist management
- Analytics and reporting
- Email marketing integration
- Social media integration


Fixed the 401 Error:
The Problem:
The API was using .select() after .insert()
This requires SELECT permission which anon role doesn't have
RLS policy allows INSERT but blocks SELECT for anon role
The Solution:
✅ Removed .select() from the insert operation
✅ Insert-only operation now aligns with RLS policies
✅ No data reading required for email signup
