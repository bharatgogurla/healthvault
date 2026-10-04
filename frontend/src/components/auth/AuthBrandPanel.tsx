"use client";

import React from "react";

interface AuthBrandPanelProps {
  activeRole?: "patient" | "doctor";
}

export default function AuthBrandPanel({ activeRole = "patient" }: AuthBrandPanelProps) {
  const isDoctor = activeRole === "doctor";

  return (
    <div className="flex flex-col justify-between h-full space-y-8">
      {/* Top Section */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DDE9E1] bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#15803D]">
          <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse"></span>
          {isDoctor ? "Doctor & Clinician Portal" : "Patient Health Record Vault"}
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-[#17211B] leading-tight">
          {isDoctor ? (
            <>
              Streamlined clinical access for <br />
              <span className="bg-gradient-to-r from-[#0F766E] to-[#16A34A] bg-clip-text text-transparent">
                authorized care teams
              </span>.
            </>
          ) : (
            <>
              Your medical history. <br />
              <span className="bg-gradient-to-r from-[#16A34A] to-[#0F766E] bg-clip-text text-transparent">
                Securely in your hands.
              </span>
            </>
          )}
        </h2>

        <p className="text-sm text-[#5F6F64] leading-relaxed">
          {isDoctor
            ? "Access consent-authorized patient records, review comprehensive histories, and make informed clinical decisions with verified authorization."
            : "Store, manage, and share your complete medical history with total privacy control. Grant consent to authorized doctors anytime."}
        </p>
      </div>

      {/* Security Highlights */}
      <div className="space-y-4 pt-4 border-t border-[#DDE9E1]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F6F64]">
          Trust & Identity Standards
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3 rounded-2xl border border-[#DDE9E1] bg-white p-3.5 shadow-sm">
            <div className="rounded-xl bg-[#DCFCE7] p-2 text-[#16A34A] shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-[#17211B]">Patient Data Ownership</div>
              <div className="text-[#5F6F64] text-[11px] mt-0.5">Strict Row-Level Security policies in PostgreSQL database.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-[#DDE9E1] bg-white p-3.5 shadow-sm">
            <div className="rounded-xl bg-teal-50 p-2 text-[#0F766E] border border-teal-100 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-[#17211B]">Verified Authorization</div>
              <div className="text-[#5F6F64] text-[11px] mt-0.5">Server-side Bearer token validation on Express backend.</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 text-[11px] text-[#5F6F64]">
          <span>HealthVault Platform v1.0</span>
          <span className="flex items-center gap-1.5 text-[#16A34A] font-medium">
            <span className="h-2 w-2 rounded-full bg-[#16A34A]"></span>
            Identity System Active
          </span>
        </div>
      </div>
    </div>
  );
}
