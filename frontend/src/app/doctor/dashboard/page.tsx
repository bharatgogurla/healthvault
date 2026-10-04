"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { fetchWithAuth } from "@/lib/api";

export default function DoctorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["doctor"]}>
      <DoctorDashboardContent />
    </ProtectedRoute>
  );
}

interface BackendDoctorUser {
  id: string;
  email: string;
  role: string;
}

interface BackendDoctorResponse {
  success: boolean;
  data?: {
    user: BackendDoctorUser;
  };
  error?: {
    message: string;
  };
}

function DoctorDashboardContent() {
  const { user, profile, signOut } = useAuth();
  const [backendData, setBackendData] = useState<BackendDoctorUser | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [loadingBackend, setLoadingBackend] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    fetchWithAuth("/auth/doctor-only")
      .then((res: BackendDoctorResponse) => {
        if (isMounted) {
          if (res.success && res.data) {
            setBackendData(res.data.user);
          } else {
            setBackendError(res.error?.message || "Failed backend doctor verification");
          }
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          console.error("Doctor backend auth error:", err);
          const msg = err instanceof Error ? err.message : "Doctor authorization failed";
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

  const isVerified = profile?.verification_status === "verified";

  return (
    <div className="min-h-screen bg-[#F6FBF8] font-sans text-[#17211B]">
      {/* Top Navbar */}
      <nav className="border-b border-[#DDE9E1] bg-white/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F766E] to-[#16A34A] font-bold text-white shadow-md">
              HV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#17211B] tracking-tight">
                  HealthVault
                </h1>
                <span className="rounded-full bg-teal-50 border border-teal-100 px-2.5 py-0.5 text-xs font-bold text-[#0F766E]">
                  Doctor Clinical Workspace
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
                Role: <span className="font-bold text-[#0F766E] uppercase">{profile?.role || "doctor"}</span>
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
        {/* Verification Status Banner */}
        {!isVerified && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-[#17211B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#17211B]">Doctor Credential Verification Pending</h4>
                <p className="text-xs text-[#5F6F64] mt-0.5">
                  Your medical credentials are submitted for review. Full clinical record access requires credential verification.
                </p>
              </div>
            </div>
            <span className="rounded-xl bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider shrink-0">
              Status: Pending Review
            </span>
          </div>
        )}

        <div className="rounded-3xl border border-[#DDE9E1] bg-white p-6 sm:p-8 shadow-medical">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-100 px-3.5 py-1 text-xs font-bold text-[#0F766E] mb-3">
            <span className="h-2 w-2 rounded-full bg-[#0F766E] animate-pulse"></span>
            Doctor Identity Authenticated
          </div>
          <h2 className="text-3xl font-extrabold text-[#17211B]">
            Welcome, {profile?.full_name || "Doctor"} 🩺
          </h2>
          <p className="mt-2 text-sm text-[#5F6F64] max-w-2xl leading-relaxed">
            Welcome to the HealthVault Doctor Workspace. Access to patient records is strictly governed by patient consent and row-level security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Profile Information Card */}
          <div className="rounded-3xl border border-[#DDE9E1] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#17211B] border-b border-[#DDE9E1] pb-3 flex items-center justify-between">
              <span>Doctor Identity & Credentials</span>
              <span className="text-xs text-[#0F766E] font-semibold bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">Verified Identity</span>
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
                <dt className="text-[#5F6F64]">License Number:</dt>
                <dd className="font-mono text-[#17211B]">{profile?.medical_license_number || "Provided during registration"}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F7F4]">
                <dt className="text-[#5F6F64]">Specialization:</dt>
                <dd className="font-medium text-[#17211B]">{profile?.specialization || "General Medicine"}</dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F7F4]">
                <dt className="text-[#5F6F64]">System Role:</dt>
                <dd className="font-bold text-[#0F766E] uppercase text-xs tracking-wider">
                  {profile?.role || "doctor"}
                </dd>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F1F7F4]">
                <dt className="text-[#5F6F64]">Verification Status:</dt>
                <dd className="font-medium">
                  {isVerified ? (
                    <span className="text-[#16A34A] font-semibold">Verified Clinician ✅</span>
                  ) : (
                    <span className="text-amber-600 font-semibold">Pending Review ⏳</span>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          {/* Backend Express Doctor Authorization Check */}
          <div className="rounded-3xl border border-[#DDE9E1] bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#17211B] border-b border-[#DDE9E1] pb-3 flex items-center justify-between">
              <span>Backend Doctor Authorization</span>
              <span className="text-xs font-mono font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">GET /api/auth/doctor-only</span>
            </h3>

            {loadingBackend ? (
              <div className="flex items-center gap-3 py-6 text-sm text-[#5F6F64]">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#0F766E] border-t-transparent"></div>
                Verifying doctor role credentials with Express backend...
              </div>
            ) : backendError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-[#DC2626]">
                <p className="font-semibold">Doctor Authorization Error:</p>
                <p className="mt-1">{backendError}</p>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="rounded-2xl border border-teal-100 bg-teal-50 p-3.5 text-xs text-[#0F766E] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0F766E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Backend verified DOCTOR role authorization!</span>
                </div>

                <div className="space-y-2 text-xs font-mono bg-[#F6FBF8] p-3.5 rounded-2xl border border-[#DDE9E1] text-[#17211B]">
                  <div><span className="text-[#5F6F64]">Authorized ID:</span> {backendData?.id}</div>
                  <div><span className="text-[#5F6F64]">Verified Role:</span> <span className="text-[#0F766E] font-bold">{backendData?.role}</span></div>
                  <div><span className="text-[#5F6F64]">Doctor Email:</span> {backendData?.email}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
