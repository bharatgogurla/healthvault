"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { fetchWithAuth } from "@/lib/api";

export default function PatientDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["patient"]}>
      <PatientDashboardContent />
    </ProtectedRoute>
  );
}

interface BackendUser {
  id: string;
  email: string;
  role: string;
}

interface BackendResponse {
  success: boolean;
  data?: {
    user: BackendUser;
  };
  error?: {
    message: string;
  };
}

function PatientDashboardContent() {
  const { user, profile, signOut } = useAuth();
  const [backendData, setBackendData] = useState<BackendUser | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [loadingBackend, setLoadingBackend] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    fetchWithAuth("/auth/me")
      .then((res: BackendResponse) => {
        if (isMounted) {
          if (res.success && res.data) {
            setBackendData(res.data.user);
          } else {
            setBackendError(res.error?.message || "Failed backend identity verification");
          }
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          console.error("Patient backend auth error:", err);
          const msg = err instanceof Error ? err.message : "Backend verification failed";
          setBackendError(msg);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingBackend(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6FBF8] font-sans text-[#17211B]">
      {/* Top Navbar */}
      <nav className="border-b border-[#DDE9E1] bg-white/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#16A34A] to-[#0F766E] font-bold text-white shadow-md">
              HV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#17211B] tracking-tight">
                  HealthVault
                </h1>
                <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#15803D]">
                  Patient Portal
                </span>
              </div>
              <span className="text-[11px] text-[#5F6F64]">Digital Health Records</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-[#17211B]">
                {profile?.full_name || user?.email}
              </div>
              <div className="text-xs text-[#5F6F64]">
                Role: <span className="font-bold text-[#16A34A] uppercase">{profile?.role || "patient"}</span>
              </div>
            </div>

            <button
              onClick={signOut}
              className="rounded-xl border border-[#DDE9E1] bg-white px-4 py-2 text-xs font-semibold text-[#5F6F64] transition hover:bg-[#F1F7F4] hover:text-[#17211B]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        <div className="rounded-3xl border border-[#DDE9E1] bg-white p-6 sm:p-8 shadow-medical">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3.5 py-1 text-xs font-bold text-[#15803D] mb-3">
            <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            Patient Workspace Active & Verified
          </div>
          <h2 className="text-3xl font-extrabold text-[#17211B]">
            Welcome, {profile?.full_name || "Patient"} 👋
          </h2>
          <p className="mt-2 text-sm text-[#5F6F64] max-w-2xl leading-relaxed">
            Your patient identity is securely authenticated. You are in total control of your digital health records and sharing permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Identity & Security Profile Card */}
          <div className="rounded-3xl border border-[#DDE9E1] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#17211B] border-b border-[#DDE9E1] pb-3 flex items-center justify-between">
              <span>Patient Identity Details</span>
              <span className="text-xs text-[#16A34A] font-semibold bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">RLS Protected</span>
            </h3>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between py-1 border-b border-[#F1F7F4]">
                <dt className="text-[#5F6F64]">Full Name:</dt>
                <dd className="font-semibold text-[#17211B]">{profile?.full_name || "N/A"}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F7F4]">
                <dt className="text-[#5F6F64]">Email Address:</dt>
                <dd className="font-medium text-[#17211B]">{user?.email}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F7F4]">
                <dt className="text-[#5F6F64]">Application Role:</dt>
                <dd className="font-bold text-[#16A34A] uppercase text-xs tracking-wider">
                  {profile?.role || "patient"}
                </dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F7F4]">
                <dt className="text-[#5F6F64]">Email Verification:</dt>
                <dd className="font-medium">
                  {user?.email_confirmed_at ? (
                    <span className="text-[#16A34A] font-semibold">Verified ✅</span>
                  ) : (
                    <span className="text-amber-600 font-semibold">Active Session</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-[#5F6F64] text-xs">Auth User ID:</dt>
                <dd className="font-mono text-xs text-[#5F6F64] truncate max-w-[200px]" title={user?.id}>
                  {user?.id}
                </dd>
              </div>
            </dl>
          </div>

          {/* Backend Express Authorization Verification */}
          <div className="rounded-3xl border border-[#DDE9E1] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#17211B] border-b border-[#DDE9E1] pb-3 flex items-center justify-between">
              <span>Backend Express JWT Verification</span>
              <span className="text-xs font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">GET /api/auth/me</span>
            </h3>

            {loadingBackend ? (
              <div className="flex items-center gap-3 py-6 text-sm text-[#5F6F64]">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#16A34A] border-t-transparent"></div>
                Verifying bearer token with Express server...
              </div>
            ) : backendError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-[#DC2626]">
                <p className="font-semibold">Authorization Failure:</p>
                <p className="mt-1">{backendError}</p>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="rounded-2xl border border-[#DCFCE7] bg-[#F6FBF8] p-3.5 text-xs text-[#15803D] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Backend verified Supabase bearer token & profile identity!</span>
                </div>

                <div className="space-y-2 text-xs font-mono bg-[#F6FBF8] p-3.5 rounded-2xl border border-[#DDE9E1] text-[#17211B]">
                  <div><span className="text-[#5F6F64]">ID:</span> {backendData?.id}</div>
                  <div><span className="text-[#5F6F64]">Role:</span> <span className="text-[#16A34A] font-bold">{backendData?.role}</span></div>
                  <div><span className="text-[#5F6F64]">Email:</span> {backendData?.email}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
