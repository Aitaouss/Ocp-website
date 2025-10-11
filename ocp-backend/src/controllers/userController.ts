import { Request, Response } from "express";

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  // TODO
};

// Get user by ID
export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO
};

// Create user
export const createUser = (req: Request, res: Response) => {
  const { email, phone, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }
  // TODO
};

// Update user
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, phone } = req.body;
};

// Delete user
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO
};
