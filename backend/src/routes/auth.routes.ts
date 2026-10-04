import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/authorize.middleware.js";
import { getMe } from "../controllers/auth.controller.js";

const router = Router();

// GET /api/auth/me - Retrieve current authenticated user profile
router.get("/me", authenticate, getMe);

// GET /api/auth/patient-only - Test endpoint for patient authorization
router.get("/patient-only", authenticate, requireRole("patient"), (req, res) => {
  res.json({
    success: true,
    data: { message: "Patient area accessed successfully", user: req.user },
  });
});

// GET /api/auth/doctor-only - Test endpoint for doctor authorization
router.get("/doctor-only", authenticate, requireRole("doctor"), (req, res) => {
  res.json({
    success: true,
    data: { message: "Doctor workspace accessed successfully", user: req.user },
  });
});

export default router;

