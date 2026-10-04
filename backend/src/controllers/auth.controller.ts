import type { Request, Response } from "express";

export const getMe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "User is not authenticated",
        },
      });
    }

    return res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error: any) {
    console.error("Error in getMe auth controller:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An internal server error occurred",
      },
    });
  }
};
