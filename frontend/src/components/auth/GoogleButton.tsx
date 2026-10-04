"use client";

import React, { useState } from "react";
import { signInWithGoogle } from "@/lib/supabaseClient";

interface GoogleButtonProps {
  role?: "patient" | "doctor";
  label?: string;
}

export default function GoogleButton({ role = "patient", label }: GoogleButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error: oauthError } = await signInWithGoogle(role);
      if (oauthError) {
        setError(oauthError.message || "Failed to initiate Google OAuth");
        setLoading(false);
      }
    } catch (err: unknown) {
      let errorMessage = err instanceof Error ? err.message : "Google authentication failed";
      if (errorMessage.includes("Failed to fetch")) {
        errorMessage = "Unable to connect to Supabase authentication server. Please verify NEXT_PUBLIC_SUPABASE_URL in frontend/.env.local";
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[#DDE9E1] bg-white py-3 px-4 text-sm font-semibold text-[#17211B] shadow-sm transition hover:bg-[#F6FBF8] hover:border-[#B8D6C4] focus:outline-none focus:ring-2 focus:ring-[#16A34A] disabled:opacity-50"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#16A34A] border-t-transparent"></div>
        ) : (
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-1.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
        )}
        <span>{loading ? "Connecting to Google..." : label || `Continue with Google`}</span>
      </button>

      {error && (
        <p className="text-center text-xs text-[#DC2626] font-medium bg-red-50 p-2 rounded-lg border border-red-100">
          {error}
        </p>
      )}
    </div>
  );
}
