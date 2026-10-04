"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const { user, profile, loading: authLoading } = useAuth();
  const [backendStatus, setBackendStatus] = useState<string>("Checking connection...");
  const [backendOk, setBackendOk] = useState<boolean>(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBackendStatus(data.message || "Connected to HealthVault Services");
        setBackendOk(true);
      })
      .catch(() => {
        setBackendStatus("Backend API Offline");
        setBackendOk(false);
      });
  }, []);

  const dashboardUrl = profile?.role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#17211B] font-sans selection:bg-[#DCFCE7] selection:text-[#15803D]">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden bg-clinical-mesh py-16 lg:py-24 border-b border-[#DDE9E1]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-[#DDE9E1] bg-[#DCFCE7]/60 px-4 py-1.5 text-xs font-semibold text-[#15803D] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                  Your Health. Your Records. Your Control.
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#17211B] leading-[1.15]">
                  Your health records, <br />
                  <span className="bg-gradient-to-r from-[#16A34A] via-[#0F766E] to-[#15803D] bg-clip-text text-transparent">
                    securely in your hands.
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-[#5F6F64] leading-relaxed max-w-2xl font-normal">
                  HealthVault gives patients a secure place to store, manage and share their medical records while giving healthcare professionals controlled access to the information they need.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  {authLoading ? (
                    <div className="flex items-center gap-2 text-sm text-[#5F6F64] py-3">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#16A34A] border-t-transparent"></div>
                      Checking identity session...
                    </div>
                  ) : user ? (
                    <Link
                      href={dashboardUrl}
                      className="rounded-xl bg-[#16A34A] px-8 py-4 text-base font-bold text-white shadow-medical hover:bg-[#15803D] transition text-center"
                    >
                      Go to {profile?.role === "doctor" ? "Doctor Workspace" : "Patient Portal"} →
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/signup"
                        className="rounded-xl bg-[#16A34A] px-8 py-4 text-base font-bold text-white shadow-medical hover:bg-[#15803D] transition text-center flex items-center justify-center gap-2"
                      >
                        Get Started
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                      <Link
                        href="/login"
                        className="rounded-xl border border-[#DDE9E1] bg-white px-8 py-4 text-base font-bold text-[#17211B] hover:bg-[#F1F7F4] transition text-center"
                      >
                        Sign In
                      </Link>
                    </>
                  )}
                </div>

                {/* System Status Pill */}
                <div className="pt-4 flex items-center gap-4 text-xs text-[#5F6F64]">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${backendOk ? "bg-[#16A34A]" : "bg-amber-500"}`}></span>
                    <span>System Status: <strong className="text-[#17211B]">{backendStatus}</strong></span>
                  </div>
                  <span>•</span>
                  <span>Row-Level Security Active</span>
                </div>
              </div>

              {/* Hero Right Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-white border border-[#DDE9E1] p-6 shadow-medical">
                  {/* Mock Health Card Banner */}
                  <div className="flex items-center justify-between border-b border-[#F1F7F4] pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] font-bold">
                        JD
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#17211B]">Jane Doe</div>
                        <div className="text-xs text-[#5F6F64]">Patient Vault ID: #HV-94820</div>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#15803D]">
                      Active Vault
                    </span>
                  </div>

                  {/* Flow Graphic: Patient -> Secure Vault -> Authorized Doctor */}
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-[#F6FBF8] border border-[#DDE9E1] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white border border-[#DDE9E1] flex items-center justify-center text-[#16A34A]">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#17211B]">Cardiology Report 2026.pdf</div>
                          <div className="text-[11px] text-[#5F6F64]">Encrypted Patient File</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                        Protected
                      </span>
                    </div>

                    <div className="rounded-2xl bg-[#F6FBF8] border border-[#DDE9E1] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white border border-[#DDE9E1] flex items-center justify-center text-[#0F766E]">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#17211B]">Consent Access Grant</div>
                          <div className="text-[11px] text-[#5F6F64]">Dr. Sarah Jenkins (Cardiologist)</div>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded">
                        Authorized
                      </span>
                    </div>
                  </div>

                  {/* Trust Footer inside graphic */}
                  <div className="mt-5 pt-4 border-t border-[#F1F7F4] flex items-center justify-between text-[11px] text-[#5F6F64]">
                    <span className="flex items-center gap-1 text-[#16A34A]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Verified Patient Permission
                    </span>
                    <span>End-to-End Control</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TRUST / SECURITY SECTION */}
        <section id="trust" className="py-20 bg-white border-b border-[#DDE9E1]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                Trust & Security Architecture
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#17211B] tracking-tight">
                Built around your privacy and control
              </p>
              <p className="text-base text-[#5F6F64]">
                HealthVault ensures every medical record is protected with patient-centric authorization and modern infrastructure security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="bg-clinical-card bg-clinical-card-hover rounded-2xl p-6">
                <div className="h-12 w-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#17211B] mb-2">
                  Patient-Controlled Records
                </h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Patients decide who can access their health information and can revoke access anytime.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-clinical-card bg-clinical-card-hover rounded-2xl p-6">
                <div className="h-12 w-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#17211B] mb-2">
                  Secure Authentication
                </h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Protected access using modern authentication, Google OAuth integration, and session management.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-clinical-card bg-clinical-card-hover rounded-2xl p-6">
                <div className="h-12 w-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#17211B] mb-2">
                  Role-Based Access
                </h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Patients and healthcare professionals receive appropriate access levels enforced on backend APIs.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-clinical-card bg-clinical-card-hover rounded-2xl p-6">
                <div className="h-12 w-12 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mb-5">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#17211B] mb-2">
                  Secure Data
                </h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Healthcare information is stored using secure database infrastructure with strict Row-Level Security policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURES SECTION */}
        <section id="features" className="py-20 bg-[#F6FBF8] border-b border-[#DDE9E1]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                Comprehensive Capabilities
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#17211B] tracking-tight">
                Everything you need to manage your health records
              </p>
              <p className="text-base text-[#5F6F64]">
                A unified platform tailored for both individuals managing personal health records and clinicians reviewing authorized medical history.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Patient Features Card */}
              <div className="bg-white border border-[#DDE9E1] rounded-3xl p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#15803D] mb-6">
                  For Patients
                </div>
                <h3 className="text-xl font-bold text-[#17211B] mb-4">
                  Patient Records & Vault
                </h3>
                <ul className="space-y-3 text-sm text-[#5F6F64]">
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Medical Records:</strong> Organize test results & diagnoses</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Document Management:</strong> Securely upload medical PDFs</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Health History:</strong> Complete longitudinal medical timeline</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Share Records:</strong> Grant access to treating physicians</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Consent Management:</strong> Instant permission revocation</span>
                  </li>
                </ul>
              </div>

              {/* Doctor Features Card */}
              <div className="bg-white border border-[#DDE9E1] rounded-3xl p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-[#0F766E] border border-teal-100 mb-6">
                  For Doctors & Clinicians
                </div>
                <h3 className="text-xl font-bold text-[#17211B] mb-4">
                  Clinical Workspace
                </h3>
                <ul className="space-y-3 text-sm text-[#5F6F64]">
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#0F766E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Patient Access:</strong> View consent-authorized records</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#0F766E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Clinical Information:</strong> Review histories & lab results</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#0F766E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Secure Viewing:</strong> Read-only protected record viewer</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#0F766E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Role-Based Permissions:</strong> Professional credential checks</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#0F766E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Audit Trail:</strong> Access transparency logs</span>
                  </li>
                </ul>
              </div>

              {/* Clinical Intelligence & AI */}
              <div className="bg-white border border-[#DDE9E1] rounded-3xl p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#15803D] mb-6">
                  Intelligence & Security
                </div>
                <h3 className="text-xl font-bold text-[#17211B] mb-4">
                  Clinical Intelligence
                </h3>
                <ul className="space-y-3 text-sm text-[#5F6F64]">
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Clinical Intelligence:</strong> Structured summary overview</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Document Analysis:</strong> Categorized record indexing</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Record Organization:</strong> Automated health timeline tagging</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>PostgreSQL Database:</strong> Schema validation & RLS</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <svg className="w-5 h-5 text-[#16A34A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Express Backend APIs:</strong> Validated JWT middleware</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-white border-b border-[#DDE9E1]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                Step-by-Step Guide
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-[#17211B] tracking-tight">
                How HealthVault Works
              </p>
              <p className="text-base text-[#5F6F64]">
                Simple, transparent workflow designed for maximum patient privacy and effortless clinical access.
              </p>
            </div>

            {/* Desktop Timeline / Mobile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Step 1 */}
              <div className="relative space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16A34A] text-white font-extrabold text-lg shadow-md shadow-emerald-600/20">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#17211B]">Create Your Account</h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Sign up as a Patient or Doctor using email and password or Google OAuth.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16A34A] text-white font-extrabold text-lg shadow-md shadow-emerald-600/20">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#17211B]">Store Health Records</h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Upload medical reports, lab histories, and health details into your encrypted vault.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16A34A] text-white font-extrabold text-lg shadow-md shadow-emerald-600/20">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#17211B]">Control Access</h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Manage patient consent and explicitly choose which clinicians are granted access.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#16A34A] text-white font-extrabold text-lg shadow-md shadow-emerald-600/20">
                  4
                </div>
                <h3 className="text-lg font-bold text-[#17211B]">Share with Doctors</h3>
                <p className="text-sm text-[#5F6F64] leading-relaxed">
                  Authorized healthcare professionals securely view medical records in their portal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PATIENT / DOCTOR SPLIT SECTION */}
        <section id="for-patients" className="py-20 bg-[#F6FBF8] border-b border-[#DDE9E1]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left: For Patients */}
              <div className="bg-white border border-[#DDE9E1] rounded-3xl p-8 lg:p-10 shadow-medical-subtle flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-[#DCFCE7] px-3.5 py-1 text-xs font-bold text-[#15803D]">
                    For Patients
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17211B]">
                    Own and control your complete medical history
                  </h3>
                  <p className="text-sm text-[#5F6F64] leading-relaxed">
                    Take charge of your healthcare journey. Store reports from any provider, manage access permissions, and share your records with doctors seamlessly.
                  </p>

                  <ul className="space-y-2.5 text-sm text-[#17211B] font-medium pt-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16A34A]"></span>
                      Own your medical records
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16A34A]"></span>
                      Manage your health information
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16A34A]"></span>
                      Control access permissions
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#16A34A]"></span>
                      Share records securely
                    </li>
                  </ul>
                </div>

                <Link
                  href="/login?role=patient"
                  className="rounded-xl bg-[#16A34A] py-3.5 px-6 text-center text-sm font-bold text-white shadow-md hover:bg-[#15803D] transition block"
                >
                  Patient Portal →
                </Link>
              </div>

              {/* Right: For Doctors */}
              <div id="for-doctors" className="bg-white border border-[#DDE9E1] rounded-3xl p-8 lg:p-10 shadow-medical-subtle flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <span className="inline-block rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-[#0F766E] border border-teal-100">
                    For Doctors & Clinicians
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17211B]">
                    Access authorized patient clinical records
                  </h3>
                  <p className="text-sm text-[#5F6F64] leading-relaxed">
                    Review patient-provided medical history, examine lab reports, and streamline clinical decision-making with high-assurance authentication.
                  </p>

                  <ul className="space-y-2.5 text-sm text-[#17211B] font-medium pt-2">
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0F766E]"></span>
                      Access authorized patient records
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0F766E]"></span>
                      View relevant medical information
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0F766E]"></span>
                      Work with patient-provided records
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0F766E]"></span>
                      Maintain controlled clinical access
                    </li>
                  </ul>
                </div>

                <Link
                  href="/login?role=doctor"
                  className="rounded-xl border border-[#0F766E] bg-teal-700 py-3.5 px-6 text-center text-sm font-bold text-white shadow-md hover:bg-[#0F766E] transition block"
                >
                  Doctor Portal →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 6. SECURITY SECTION */}
        <section id="security" className="py-20 bg-white border-b border-[#DDE9E1]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#F6FBF8] to-[#F1F7F4] border border-[#DDE9E1] rounded-3xl p-8 lg:p-14">
              <div className="max-w-3xl space-y-4 mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  Enterprise-Grade Security Standards
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17211B] tracking-tight">
                  Healthcare information deserves a higher standard of privacy.
                </h2>
                <p className="text-base text-[#5F6F64]">
                  HealthVault utilizes multi-layered security engineering to safeguard sensitive health data across frontend client apps, backend APIs, and PostgreSQL database logic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-5 border border-[#DDE9E1] space-y-2">
                  <div className="font-bold text-[#17211B] text-sm">Secure Authentication</div>
                  <p className="text-xs text-[#5F6F64]">Supabase Auth with JWT session validation & OAuth token handling.</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#DDE9E1] space-y-2">
                  <div className="font-bold text-[#17211B] text-sm">Role-Based Access Control</div>
                  <p className="text-xs text-[#5F6F64]">Strict patient & doctor authorization enforced via backend Express middleware.</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#DDE9E1] space-y-2">
                  <div className="font-bold text-[#17211B] text-sm">Patient Consent Engine</div>
                  <p className="text-xs text-[#5F6F64]">Patients maintain full sovereignty to grant or revoke clinician permissions.</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#DDE9E1] space-y-2">
                  <div className="font-bold text-[#17211B] text-sm">Protected Backend APIs</div>
                  <p className="text-xs text-[#5F6F64]">All internal endpoint routes require valid Bearer token verification.</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#DDE9E1] space-y-2">
                  <div className="font-bold text-[#17211B] text-sm">Database Security</div>
                  <p className="text-xs text-[#5F6F64]">PostgreSQL Row-Level Security (RLS) policies prevent unauthorized row access.</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#DDE9E1] space-y-2">
                  <div className="font-bold text-[#17211B] text-sm">Secure Sessions</div>
                  <p className="text-xs text-[#5F6F64]">Auto-refreshing authorization tokens and secure client storage.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17211B] tracking-tight">
              Take control of your health records.
            </h2>
            <p className="text-lg text-[#5F6F64] max-w-2xl mx-auto">
              Secure your medical information and decide who gets access. Join HealthVault today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/signup"
                className="w-full sm:w-auto rounded-xl bg-[#16A34A] px-8 py-4 text-base font-bold text-white shadow-medical hover:bg-[#15803D] transition"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto rounded-xl border border-[#DDE9E1] bg-white px-8 py-4 text-base font-bold text-[#17211B] hover:bg-[#F1F7F4] transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
