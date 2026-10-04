"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardUrl = profile?.role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#DDE9E1] bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#16A34A] to-[#0F766E] text-white font-extrabold text-xl shadow-md shadow-emerald-600/15 group-hover:scale-105 transition-transform">
            HV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#17211B]">
                HealthVault
              </span>
              <span className="hidden sm:inline-block rounded-full bg-[#DCFCE7] px-2 py-0.5 text-[10px] font-semibold text-[#15803D]">
                v1.0
              </span>
            </div>
            <span className="block text-[11px] font-medium text-[#5F6F64]">
              Digital Health Records
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5F6F64]">
          <a href="#features" className="hover:text-[#16A34A] transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[#16A34A] transition-colors">
            How It Works
          </a>
          <a href="#security" className="hover:text-[#16A34A] transition-colors">
            Security
          </a>
          <a href="#for-patients" className="hover:text-[#16A34A] transition-colors">
            For Patients
          </a>
          <a href="#for-doctors" className="hover:text-[#16A34A] transition-colors">
            For Doctors
          </a>
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={dashboardUrl}
                className="rounded-xl bg-[#16A34A] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-[#15803D] transition focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-xl border border-[#DDE9E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#5F6F64] hover:bg-[#F1F7F4] hover:text-[#17211B] transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl border border-[#DDE9E1] bg-white px-4 py-2.5 text-sm font-semibold text-[#17211B] hover:bg-[#F1F7F4] transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-xl bg-[#16A34A] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-[#15803D] transition focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden rounded-xl border border-[#DDE9E1] p-2.5 text-[#5F6F64] hover:bg-[#F1F7F4] focus:outline-none"
          aria-label="Toggle mobile navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#DDE9E1] bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#17211B]">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-[#F1F7F4] text-[#5F6F64]"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-[#F1F7F4] text-[#5F6F64]"
            >
              How It Works
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-[#F1F7F4] text-[#5F6F64]"
            >
              Security
            </a>
            <a
              href="#for-patients"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-[#F1F7F4] text-[#5F6F64]"
            >
              For Patients
            </a>
            <a
              href="#for-doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-lg hover:bg-[#F1F7F4] text-[#5F6F64]"
            >
              For Doctors
            </a>
          </nav>

          <div className="pt-4 border-t border-[#DDE9E1] flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  href={dashboardUrl}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl bg-[#16A34A] py-3 text-sm font-semibold text-white shadow-md"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center rounded-xl border border-[#DDE9E1] bg-white py-3 text-sm font-semibold text-[#5F6F64]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl border border-[#DDE9E1] bg-white py-3 text-sm font-semibold text-[#17211B]"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-xl bg-[#16A34A] py-3 text-sm font-semibold text-white shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
