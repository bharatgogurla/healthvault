"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRouterPage() {
  return (
    <ProtectedRoute>
      <DashboardRouterContent />
    </ProtectedRoute>
  );
}

function DashboardRouterContent() {
  const router = useRouter();
  const { profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (profile?.role === "doctor") {
      router.replace("/doctor/dashboard");
    } else {
      router.replace("/patient/dashboard");
    }
  }, [profile, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 font-sans text-slate-100">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-sm font-medium text-slate-400">Loading your role workspace...</p>
      </div>
    </div>
  );
}
