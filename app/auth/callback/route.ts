import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Check if user has completed their profile
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.user_metadata?.profile_completed) {
        // Profile already completed, redirect to home
        return NextResponse.redirect(`${origin}/`);
      } else {
        // New user or incomplete profile, redirect to confirm info page
        return NextResponse.redirect(`${origin}/auth/confirm`);
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/error`);
}
