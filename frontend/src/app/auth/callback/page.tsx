"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F6FBF8] p-4 font-sans text-[#17211B]">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#16A34A] border-t-transparent" />

            <h2 className="text-xl font-bold text-[#17211B]">
              Completing Secure Authentication...
            </h2>
          </div>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}

function AuthCallbackContent() {
  const searchParams = useSearchParams();

  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const processCallback = async () => {
      try {
        console.log("[AuthCallback] Starting callback processing");

        // --------------------------------------------------
        // 1. Get OAuth code and requested role
        // --------------------------------------------------

        const code = searchParams.get("code");

        const requestedRole =
          searchParams.get("role") || "patient";

        console.log("[AuthCallback] Code exists:", !!code);
        console.log(
          "[AuthCallback] Requested role:",
          requestedRole
        );

        // --------------------------------------------------
        // 2. Exchange OAuth code for session
        // --------------------------------------------------

        if (code) {
          console.log(
            "[AuthCallback] Exchanging OAuth code..."
          );

          const { error } =
            await supabase.auth.exchangeCodeForSession(
              code
            );

          if (error) {
            console.error(
              "[AuthCallback] Code exchange failed:",
              error
            );

            window.location.replace(
              "/login?error=OAuthCodeExchangeFailed"
            );

            return;
          }

          console.log(
            "[AuthCallback] OAuth code exchanged successfully"
          );
        }

        // --------------------------------------------------
        // 3. Get current session
        // --------------------------------------------------

        console.log(
          "[AuthCallback] Getting current session..."
        );

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error(
            "[AuthCallback] Session error:",
            sessionError
          );

          window.location.replace(
            "/login?error=SessionError"
          );

          return;
        }

        if (!session?.user) {
          console.error(
            "[AuthCallback] No authenticated user found"
          );

          window.location.replace(
            "/login?error=AuthenticationFailed"
          );

          return;
        }

        const activeUser = session.user;

        console.log(
          "[AuthCallback] Authenticated user:",
          activeUser.email
        );

        // --------------------------------------------------
        // 4. Fetch profile directly
        // --------------------------------------------------

        console.log(
          "[AuthCallback] Fetching profile..."
        );

        const {
          data: profile,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", activeUser.id)
          .maybeSingle();

        if (profileError) {
          console.error(
            "[AuthCallback] Profile query failed:",
            profileError
          );

          window.location.replace(
            "/login?error=ProfileLookupFailed"
          );

          return;
        }

        console.log(
          "[AuthCallback] Profile:",
          profile
        );

        // --------------------------------------------------
        // 5. Determine role
        // --------------------------------------------------

        const finalRole =
          profile?.role ||
          activeUser.user_metadata?.role ||
          requestedRole ||
          "patient";

        console.log(
          "[AuthCallback] Final role:",
          finalRole
        );

        // --------------------------------------------------
        // 6. Determine destination
        // --------------------------------------------------

        const destination =
          finalRole === "doctor"
            ? "/doctor/dashboard"
            : "/patient/dashboard";

        console.log(
          "[AuthCallback] Redirecting to:",
          destination
        );

        // --------------------------------------------------
        // 7. Redirect
        // --------------------------------------------------

        if (!cancelled) {
          window.location.replace(destination);
        }
      } catch (error) {
        console.error(
          "[AuthCallback] Unexpected error:",
          error
        );

        if (!cancelled) {
          window.location.replace(
            "/login?error=OAuthCallbackFailed"
          );
        }
      } finally {
        if (!cancelled) {
          setProcessing(false);
        }
      }
    };

    processCallback();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6FBF8] p-4 font-sans text-[#17211B]">
      <div className="flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-[#DDE9E1] bg-white p-8 text-center shadow-medical">
        <div className="mb-2 h-12 w-12 animate-spin rounded-full border-4 border-[#16A34A] border-t-transparent" />

        <h2 className="text-xl font-bold text-[#17211B]">
          Completing Secure Authentication
        </h2>

        <p className="text-sm text-[#5F6F64]">
          Verifying your session identity and loading your
          HealthVault workspace...
        </p>
      </div>
    </div>
  );
}
