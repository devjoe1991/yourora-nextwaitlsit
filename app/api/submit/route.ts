import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    // Validate email
    if (!email || !email.includes('@')) {
      return new Response("Invalid email address", { status: 400 });
    }

    // Insert email into waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { email: email.toLowerCase().trim() }
      ])

    if (error) {
      // Check if it's a unique constraint violation (email already exists)
      if (error.code === '23505') {
        return new Response("User already exists", { status: 409 });
      }
      
      console.error("Supabase error:", error);
      return new Response("Database error", { status: 500 });
    }

    console.log(`Email submitted successfully: ${email}`);
    
    return new Response("Email submitted successfully!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error submitting email:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
