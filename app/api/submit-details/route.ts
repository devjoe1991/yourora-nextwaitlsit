import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  const { email, firstName, lastName, goals, otherGoalText } = await request.json();

  try {
    // Validate required fields
    if (!email || !firstName || !lastName) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Use the exact frontend options (no mapping needed)
    let fitnessGoal = null;
    let otherFitnessGoal = null;
    
    if (goals && goals.length > 0) {
      // Take the first selected goal (exact match with frontend)
      const selectedGoal = goals[0];
      
      // Use the exact frontend option as the enum value
      fitnessGoal = selectedGoal;
      
      // If it's "Other", store the custom text
      if (selectedGoal === 'Other') {
        otherFitnessGoal = otherGoalText || '';
      }
    }

    // Update the existing row with the additional details
    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .update({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        fitness_goal: fitnessGoal,
        other_fitness_goal: otherFitnessGoal
      })
      .eq('email', email.toLowerCase().trim())

    if (error) {
      console.error("Supabase error:", error);
      return new Response("Database error", { status: 500 });
    }

    console.log(`User details updated successfully for: ${email}`);
    
    return new Response("User details submitted successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error submitting user details:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
