"use client";

import React from "react";

interface RoleSelectorProps {
  selectedRole: "patient" | "doctor";
  onChange: (role: "patient" | "doctor") => void;
}

export default function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-[#5F6F64]">
        Select Your Account Role
      </label>
      <div className="grid grid-cols-2 gap-3">
        {/* Patient Role Button */}
        <button
          type="button"
          onClick={() => onChange("patient")}
          className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition ${
            selectedRole === "patient"
              ? "border-[#16A34A] bg-[#DCFCE7]/50 text-[#17211B] ring-2 ring-[#16A34A]/20 shadow-sm"
              : "border-[#DDE9E1] bg-white text-[#5F6F64] hover:bg-[#F6FBF8] hover:text-[#17211B]"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="font-bold text-sm text-[#17211B] flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Patient
            </span>
            {selectedRole === "patient" && (
              <span className="h-4 w-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#5F6F64] leading-tight">
            Manage your records & consent
          </span>
        </button>

        {/* Doctor Role Button */}
        <button
          type="button"
          onClick={() => onChange("doctor")}
          className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition ${
            selectedRole === "doctor"
              ? "border-[#0F766E] bg-teal-50 text-[#17211B] ring-2 ring-[#0F766E]/20 shadow-sm"
              : "border-[#DDE9E1] bg-white text-[#5F6F64] hover:bg-[#F6FBF8] hover:text-[#17211B]"
          }`}
        >
          <div className="flex items-center justify-between w-full mb-1">
            <span className="font-bold text-sm text-[#17211B] flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#0F766E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Doctor / Clinician
            </span>
            {selectedRole === "doctor" && (
              <span className="h-4 w-4 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-[10px]">
                ✓
              </span>
            )}
          </div>
          <span className="text-[11px] text-[#5F6F64] leading-tight">
            Access authorized patient records
          </span>
        </button>
      </div>
    </div>
  );
}
