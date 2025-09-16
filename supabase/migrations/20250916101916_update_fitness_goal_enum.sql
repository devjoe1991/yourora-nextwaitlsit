-- Drop the existing enum type and recreate with frontend options
drop type if exists fitness_goal_type cascade;

-- Create new enum type matching the frontend dropdown exactly
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
);

-- Add the fitness_goal column with the new enum type
alter table public.waitlist 
add column fitness_goal fitness_goal_type;
