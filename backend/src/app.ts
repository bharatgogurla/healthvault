import express from "express";
import cors from "cors";
import helmet from "helmet";
import { supabase } from "./lib/supabase.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

// Auth routes (/api/auth)
app.use("/api/auth", authRoutes);

// Backend health check (Aligned with /api/health per docs/api-design.md)
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "HealthVault backend is running",
  });
});

// Backward compatibility for /api/v1/health
app.get("/api/v1/health", (_req, res) => {
  res.json({
    success: true,
    message: "HealthVault backend is running",
  });
});

// Supabase connection health check
app.get("/api/health/supabase", async (_req, res) => {
  try {
    const { error } = await supabase
      .from("health_check")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase health check error:", error);

      return res.status(500).json({
        success: false,
        message: "Supabase connection failed",
        error: error.message,
      });
    }

    return res.json({
      success: true,
      message: "Supabase connection successful",
    });
  } catch (error) {
    console.error("Supabase health check error:", error);

    return res.status(500).json({
      success: false,
      message: "Supabase connection failed",
    });
  }
});

export default app;