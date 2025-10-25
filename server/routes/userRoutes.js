import express from "express";
import {
  getMyProfile,
  getUserById,
  updateProfile,
  updateNotifications,
  searchUsers,
  getAllExperts,
  deleteMyAccount,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

// ===== IMPORTANT: Specific routes MUST come BEFORE dynamic routes =====

// Profile Routes (authenticated)
router.get("/me", isAuthenticated, getMyProfile);
router.put("/update", isAuthenticated, updateProfile);
router.delete("/delete", isAuthenticated, deleteMyAccount);

// Notification Preferences
router.put("/notifications", isAuthenticated, updateNotifications);

// Search & Discovery - MUST be before /:id
router.get("/search/users", searchUsers); // Public route
router.get("/experts/all", getAllExperts); // Public route

// Dynamic ID route - MUST be LAST
router.get("/:id", getUserById); // Public route - This catches everything else

export default router;
