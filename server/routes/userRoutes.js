import express from "express";
import {
  getMyProfile,
  getUserById,
  updateProfile,
  updateNotifications,
  searchUsers,
  getAllExperts,
  deleteMyAccount,
  updateUserLocation,
  updateUserLocationByCoordinates,
  getNearbyUsers,
  getUsersByCity,
  searchUsersByLocationAndSkills,
  getNearbyExperts,
  getMockNearbyUsers
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

// ===== IMPORTANT: Specific routes MUST come BEFORE dynamic routes =====

// Profile Routes (authenticated)
router.get("/me", isAuthenticated, getMyProfile);
router.get("/:id", getUserById); // Public route
router.put("/update", isAuthenticated, updateProfile);
router.delete("/delete", isAuthenticated, deleteMyAccount);

// Notification Preferences
router.put("/notifications", isAuthenticated, updateNotifications);

// Search & Discovery - MUST be before /:id
router.get("/search/users", searchUsers); // Public route
router.get("/experts/all", getAllExperts); // Public route

export default router;
