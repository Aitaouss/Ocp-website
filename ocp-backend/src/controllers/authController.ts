import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { db } from "../database/db";

interface User {
  id: number;
  email: string;
  phone?: string;
  password: string;
  role: string;
}

// Generate JWT Token
const generateToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET || "default-secret";
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  };

  return jwt.sign({ id: userId }, secret, options);
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

    // Check if user exists
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, user: User) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "Database error",
            error: err.message,
          });
          return;
        }

        if (!user) {
          res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
          return;
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
          return;
        }

        // Generate token
        const token = generateToken(user.id);

        // Cookie options
        const cookieExpire = parseInt(process.env.COOKIE_EXPIRE || "7");
        const cookieOptions = {
          expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax" as const,
        };

        // Send response with cookie
        res
          .status(200)
          .cookie("token", token, cookieOptions)
          .json({
            success: true,
            message: "Login successful",
            user: {
              id: user.id,
              email: user.email,
              phone: user.phone,
              role: user.role,
            },
            token,
          });
      }
    );
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

    // Check if user already exists
    db.get(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, user) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "Database error",
            error: err.message,
          });
          return;
        }

        if (user) {
          res.status(400).json({
            success: false,
            message: "User already exists",
          });
          return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        db.run(
          "INSERT INTO users (email, password, phone) VALUES (?, ?, ?)",
          [email, hashedPassword, phone || null],
          function (err) {
            if (err) {
              res.status(500).json({
                success: false,
                message: "Error creating user",
                error: err.message,
              });
              return;
            }

            // Generate token
            const token = generateToken(this.lastID);

            // Cookie options
            const cookieExpire = parseInt(process.env.COOKIE_EXPIRE || "7");
            const cookieOptions = {
              expires: new Date(
                Date.now() + cookieExpire * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax" as const,
            };

            // Send response with cookie
            res
              .status(201)
              .cookie("token", token, cookieOptions)
              .json({
                success: true,
                message: "User registered successfully",
                user: {
                  id: this.lastID,
                  email,
                  phone,
                },
                token,
              });
          }
        );
      }
    );
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

  db.get(
    "SELECT id, email, phone, role FROM users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Database error",
          error: err.message,
        });
        return;
      }

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        user,
      });
    }
  );
};
