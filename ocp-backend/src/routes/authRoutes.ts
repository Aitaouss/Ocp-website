import { Router } from "express";
import {
  login,
  register,
  logout,
  getCurrentUser,
} from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = Router();

// Public routes
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

// Protected routes
router.get("/me", protect, getCurrentUser);

export default router;
