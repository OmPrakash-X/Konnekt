import express from "express";
import {
  createBadge,
  getAllBadges,
  getBadgeById,
  updateBadge,
  deleteBadge,
  getBadgesByCategory,
} from "../controllers/badgeController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/isAuth.js";

const router = express.Router();

// ===== Public Routes =====
router.get("/all", getAllBadges);
router.get("/:id", getBadgeById);
router.get("/category/:category", getBadgesByCategory);

// ===== Admin Only Routes =====
router.post("/create", isAuthenticated, authorizeRoles("admin"), createBadge);
router.put("/:id", isAuthenticated, authorizeRoles("admin"), updateBadge);
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteBadge);

export default router;
