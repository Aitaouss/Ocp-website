import { Request, Response } from "express";
import { db } from "../database/db";

// Get all users
export const getAllUsers = (req: Request, res: Response) => {
  const sql = "SELECT id, email, phone, created_at FROM users";

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
};

// Get user by ID
export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "SELECT id, email, phone, created_at FROM users WHERE id = ?";

  db.get(sql, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ user: row });
  });
};

// Create user
export const createUser = (req: Request, res: Response) => {
  const { email, phone, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const sql = "INSERT INTO users (email, phone, password) VALUES (?, ?, ?)";

  db.run(sql, [email, phone, password], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: "User created successfully",
      user: { id: this.lastID, email, phone },
    });
  });
};

// Update user
export const updateUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, phone } = req.body;

  const sql =
    "UPDATE users SET email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";

  db.run(sql, [email, phone, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ message: "User updated successfully" });
  });
};

// Delete user
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  });
};
