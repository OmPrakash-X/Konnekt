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

// ===== Profile Routes =====
router.get("/me", isAuthenticated, getMyProfile);
router.get("/:id", getUserById); // Public route
router.put("/update", isAuthenticated, updateProfile);
router.delete("/delete", isAuthenticated, deleteMyAccount);

// ===== Notification Preferences =====
router.put("/notifications", isAuthenticated, updateNotifications);

// ===== Search & Discovery =====
router.get("/search/users", searchUsers); // Public route
router.get("/experts/all", getAllExperts); // Public route

export default router;
