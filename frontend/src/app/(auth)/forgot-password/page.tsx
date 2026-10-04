"use client";

import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import AuthLayout from "@/components/auth/AuthLayout";

const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validation = emailSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid email");
      return;
    }

    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: redirectUrl }
      );

      if (resetError) {
        setError(resetError.message);
      } else {
        setSuccess(
          "Password reset link sent! Check your email inbox for instructions."
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#17211B]">
            Forgot Password?
          </h2>
          <p className="mt-1 text-sm text-[#5F6F64]">
            Enter your account email address and we will send you a secure password recovery link.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-[#DC2626] flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="rounded-2xl border border-[#DCFCE7] bg-[#F6FBF8] p-5 text-xs text-[#15803D] leading-relaxed text-center space-y-3">
            <div className="font-bold text-sm text-[#17211B]">Recovery Email Sent</div>
            <p>{success}</p>
            <div className="pt-2">
              <Link href="/login" className="inline-block rounded-xl bg-[#16A34A] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#15803D] transition">
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#5F6F64] uppercase tracking-wider mb-1">
                Account Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full rounded-2xl border border-[#DDE9E1] bg-[#F6FBF8] px-4 py-3 text-sm text-[#17211B] placeholder-[#5F6F64]/60 focus:border-[#16A34A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#16A34A] py-3.5 text-sm font-bold text-white transition hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:ring-offset-2 disabled:opacity-50 shadow-medical"
            >
              {loading ? "Sending reset link..." : "Send Recovery Link"}
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-[#5F6F64]">
          Remembered your password?{" "}
          <Link href="/login" className="font-bold text-[#16A34A] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
