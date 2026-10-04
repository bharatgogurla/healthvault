import type { Request, Response, NextFunction } from "express";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication is required",
        },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "You do not have permission to perform this action",
        },
      });
    }

    return next();
  };
};

export const requireVerifiedDoctor = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication is required",
        },
      });
    }

    if (req.user.role !== "doctor") {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Doctor authorization is required",
        },
      });
    }

    if (req.user.verification_status !== "verified") {
      return res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN_UNVERIFIED_DOCTOR",
          message: "Doctor account verification is pending approval",
        },
      });
    }

    return next();
  };
};

