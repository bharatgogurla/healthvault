"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#DDE9E1] bg-[#F6FBF8] pt-16 pb-12 text-sm text-[#5F6F64]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#DDE9E1]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#16A34A] to-[#0F766E] text-white font-extrabold text-lg shadow-md">
                HV
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-[#17211B]">
                  HealthVault
                </span>
                <span className="block text-xs font-medium text-[#5F6F64]">
                  Digital Health Records & Intelligence
                </span>
              </div>
            </Link>
            <p className="text-sm text-[#5F6F64] max-w-sm leading-relaxed">
              HealthVault puts patients in full control of their medical records while providing healthcare professionals with secure, consent-based clinical access.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-[#0F766E]">
              <span className="h-2 w-2 rounded-full bg-[#16A34A]"></span>
              High-Assurance Patient Consent & Encryption
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-bold text-[#17211B] tracking-wide text-xs uppercase mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#features" className="hover:text-[#16A34A] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#16A34A] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#16A34A] transition-colors">
                  Security Architecture
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#16A34A] transition-colors">
                  Portal Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#17211B] tracking-wide text-xs uppercase mb-4">
              Portals
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/login?role=patient" className="hover:text-[#16A34A] transition-colors">
                  Patient Portal
                </Link>
              </li>
              <li>
                <Link href="/login?role=doctor" className="hover:text-[#16A34A] transition-colors">
                  Doctor & Clinician Portal
                </Link>
              </li>
              <li>
                <Link href="/signup?role=patient" className="hover:text-[#16A34A] transition-colors">
                  Create Patient Account
                </Link>
              </li>
              <li>
                <Link href="/signup?role=doctor" className="hover:text-[#16A34A] transition-colors">
                  Register as Doctor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#17211B] tracking-wide text-xs uppercase mb-4">
              Trust & Legal
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#security" className="hover:text-[#16A34A] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#16A34A] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#16A34A] transition-colors">
                  Patient Data Rights
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#16A34A] transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6F64]">
          <p>© 2026 HealthVault. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Patient-Controlled Identity System</span>
            <span>•</span>
            <span>Version 1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
