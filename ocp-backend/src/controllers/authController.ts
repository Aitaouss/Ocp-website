import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  id: number;
  email: string;
  phone?: string;
  password: string;
  role: string;
}

// Generate JWT Token
const generateToken = (userId: number, userRole: string): string => {
  const secret = process.env.JWT_SECRET || "default-secret";
  const expiresIn = Number(process.env.JWT_EXPIRE) || 7 * 24 * 60 * 60;

  return jwt.sign({ id: userId, role: userRole }, secret, { expiresIn });
};

// Login Controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
      return;
    }

    // TODO Check if user exists
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Register Controller
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, phone } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
      return;
    }

    // TODO Check if user already exists
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Logout Controller
export const logout = (req: Request, res: Response): void => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

// Get Current User (Protected Route)
export const getCurrentUser = (req: Request, res: Response): void => {
  const userId = (req as any).user?.id;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }
  // TODO Fetch user from database
};
