import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const requestedRole = searchParams.get("role") || "patient";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=MissingOAuthCode`);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[AuthCallbackRoute] OAuth code exchange failed:", error);
    return NextResponse.redirect(
      `${origin}/login?error=OAuthCodeExchangeFailed`
    );
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error(
      "[AuthCallbackRoute] Failed to get authenticated user:",
      userError
    );
    return NextResponse.redirect(
      `${origin}/login?error=AuthenticationFailed`
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("[AuthCallbackRoute] Profile query failed:", profileError);
    return NextResponse.redirect(
      `${origin}/login?error=ProfileLookupFailed`
    );
  }

  const finalRole =
    profile?.role ||
    user.user_metadata?.role ||
    requestedRole ||
    "patient";

  const destination =
    finalRole === "doctor" ? "/doctor/dashboard" : "/patient/dashboard";

  return NextResponse.redirect(`${origin}${destination}`);
}
