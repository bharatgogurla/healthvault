"use client";

import React from "react";
import Link from "next/link";
import AuthBrandPanel from "./AuthBrandPanel";

interface AuthLayoutProps {
  children: React.ReactNode;
  activeRole?: "patient" | "doctor";
}

export default function AuthLayout({ children, activeRole = "patient" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-clinical-mesh flex flex-col justify-between font-sans selection:bg-[#DCFCE7] selection:text-[#15803D]">
      {/* Top Header Bar */}
      <header className="w-full px-4 sm:px-8 py-5 flex items-center justify-between border-b border-[#DDE9E1] bg-white/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#16A34A] to-[#0F766E] text-white font-extrabold text-lg shadow-md shadow-emerald-600/15">
            HV
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#17211B]">
              HealthVault
            </span>
            <span className="block text-[11px] font-medium text-[#5F6F64]">
              Digital Health Records
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="text-xs font-semibold text-[#5F6F64] hover:text-[#16A34A] flex items-center gap-1.5 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Main Site
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl rounded-3xl bg-white border border-[#DDE9E1] shadow-medical overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Brand / Trust Panel */}
          <div className="lg:col-span-5 bg-[#F6FBF8] border-b lg:border-b-0 lg:border-r border-[#DDE9E1] p-8 lg:p-10">
            <AuthBrandPanel activeRole={activeRole} />
          </div>

          {/* Right Authentication Form Card */}
          <div className="lg:col-span-7 p-8 sm:p-10 bg-white flex flex-col justify-center">
            {children}
          </div>
        </div>
      </main>

      {/* Footer copyright bar */}
      <footer className="py-4 text-center text-xs text-[#5F6F64] border-t border-[#DDE9E1] bg-white">
        © 2026 HealthVault. Secure Patient & Doctor Identity Platform.
      </footer>
    </div>
  );
}
