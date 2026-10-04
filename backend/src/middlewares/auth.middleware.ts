import type { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication token is missing or malformed",
        },
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication token is required",
        },
      });
    }

    // Verify token with Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Invalid or expired authentication token",
        },
      });
    }

    // Fetch identity profile from PostgreSQL database
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("Failed to fetch user profile during authentication:", profileError);
    }

    // Attach verified user identity to express request object
    const metaRole = (user.user_metadata?.role as any) || "patient";
    req.user = {
      id: user.id,
      email: user.email || "",
      role: profile?.role || metaRole,
      verification_status: profile?.verification_status || (metaRole === "doctor" ? "pending" : "verified"),
      profile: profile || null,
    };

    return next();
  } catch (error: any) {
    console.error("Unhandled error in authentication middleware:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred during authentication",
      },
    });
  }
};
