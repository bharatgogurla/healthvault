"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import AuthLayout from "@/components/auth/AuthLayout";
import RoleSelector from "@/components/auth/RoleSelector";
import GoogleButton from "@/components/auth/GoogleButton";

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F6FBF8] text-[#5F6F64]">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#16A34A] border-t-transparent"></div>
            Loading sign in form...
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile } = useAuth();

  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor">(
    searchParams.get("role") === "doctor" ? "doctor" : "patient"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && profile) {
      if (profile.role === "doctor") {
        router.push("/doctor/dashboard");
      } else {
        router.push("/patient/dashboard");
      }
    }
  }, [user, profile, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid input details";
      setError(firstError);
      return;
    }

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          setError("Email or password is incorrect.");
        } else {
          setError(authError.message);
        }
      } else if (data.user) {
        const { data: userProfile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .maybeSingle();

        const userRole = userProfile?.role || data.user.user_metadata?.role || selectedRole || "patient";
        if (userRole === "doctor") {
          router.push("/doctor/dashboard");
        } else {
          router.push("/patient/dashboard");
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred during sign in";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout activeRole={selectedRole}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#17211B]">
            Welcome to HealthVault
          </h2>
          <p className="mt-1 text-sm text-[#5F6F64]">
            {selectedRole === "doctor"
              ? "Access your doctor workspace & authorized patient records."
              : "Securely access your patient health records and vault."}
          </p>
        </div>

        <RoleSelector selectedRole={selectedRole} onChange={setSelectedRole} />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-[#DC2626] flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#5F6F64] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={selectedRole === "doctor" ? "dr.smith@hospital.org" : "patient@example.com"}
              className="w-full rounded-2xl border border-[#DDE9E1] bg-[#F6FBF8] px-4 py-3 text-sm text-[#17211B] placeholder-[#5F6F64]/60 focus:border-[#16A34A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#5F6F64] uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#16A34A] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-[#DDE9E1] bg-[#F6FBF8] px-4 py-3 pr-10 text-sm text-[#17211B] placeholder-[#5F6F64]/60 focus:border-[#16A34A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5F6F64] hover:text-[#17211B]"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 014.122-.863c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21m-4.22-4.22L3 3" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl py-3.5 text-sm font-bold text-white transition shadow-medical focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${
              selectedRole === "doctor"
                ? "bg-[#0F766E] hover:bg-[#0D655E] focus:ring-[#0F766E]"
                : "bg-[#16A34A] hover:bg-[#15803D] focus:ring-[#16A34A]"
            }`}
          >
            {loading ? "Authenticating session..." : `Sign In as ${selectedRole === "doctor" ? "Doctor" : "Patient"}`}
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#DDE9E1]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-[#5F6F64] font-semibold">Or continue with</span>
          </div>
        </div>

        <GoogleButton role={selectedRole} />

        <div className="pt-2 text-center text-xs text-[#5F6F64]">
          Don&apos;t have an account?{" "}
          <Link
            href={`/signup?role=${selectedRole}`}
            className="font-bold text-[#16A34A] hover:underline"
          >
            Register as a {selectedRole === "doctor" ? "Doctor" : "Patient"}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
