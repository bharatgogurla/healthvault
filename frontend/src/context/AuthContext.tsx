"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: "patient" | "doctor" | "organization" | "admin";
  verification_status?: "pending" | "verified" | "rejected";
  medical_license_number?: string | null;
  specialization?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async (
    userId: string,
    targetUser?: User | null
  ) => {
    const activeUser = targetUser || user;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.warn(
          "Could not fetch user profile from Supabase DB:",
          error.message || error
        );
      }

      if (data) {
        setProfile(data as UserProfile);
        return;
      }

      // Fallback to Supabase user metadata
      if (activeUser) {
        const meta = activeUser.user_metadata || {};

        const fallbackProfile: UserProfile = {
          id: activeUser.id,
          email: activeUser.email || "",
          full_name:
            meta.full_name ||
            activeUser.email?.split("@")[0] ||
            "User",
          role: (meta.role as UserProfile["role"]) || "patient",
          verification_status:
            meta.role === "doctor"
              ? "pending"
              : "verified",
          medical_license_number:
            meta.medical_license_number || null,
          specialization:
            meta.specialization || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setProfile(fallbackProfile);

        // Only attempt persistence if the profile query itself
        // did not fail.
        if (!error) {
          const { error: upsertError } = await supabase
            .from("profiles")
            .upsert(fallbackProfile);

          if (upsertError) {
            console.warn(
              "Background profile upsert notice:",
              upsertError.message
            );
          }
        }
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.warn("Profile fetch exception:", err);

      if (activeUser) {
        const meta = activeUser.user_metadata || {};

        setProfile({
          id: activeUser.id,
          email: activeUser.email || "",
          full_name:
            meta.full_name ||
            activeUser.email?.split("@")[0] ||
            "User",
          role:
            (meta.role as UserProfile["role"]) ||
            "patient",
          verification_status:
            meta.role === "doctor"
              ? "pending"
              : "verified",
          medical_license_number:
            meta.medical_license_number || null,
          specialization:
            meta.specialization || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } else {
        setProfile(null);
      }
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id, user);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // --------------------------------------------------
    // Initial session check
    // --------------------------------------------------
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(
            session.user.id,
            session.user
          );
        }
      } catch (error) {
        console.error(
          "Failed to initialize authentication:",
          error
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // --------------------------------------------------
    // Auth state listener
    // --------------------------------------------------
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (!session?.user) {
          setProfile(null);
          setLoading(false);
          return;
        }

        /*
         * IMPORTANT:
         *
         * Do NOT await Supabase database queries directly
         * inside onAuthStateChange.
         *
         * The auth event should finish first. Then fetch
         * the profile asynchronously.
         */
        setTimeout(async () => {
          if (!isMounted) return;

          try {
            await fetchProfile(
              session.user.id,
              session.user
            );
          } catch (error) {
            console.error(
              "Failed to fetch profile after auth change:",
              error
            );
          } finally {
            if (isMounted) {
              setLoading(false);
            }
          }
        }, 0);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);

    await supabase.auth.signOut();

    setUser(null);
    setSession(null);
    setProfile(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
};
