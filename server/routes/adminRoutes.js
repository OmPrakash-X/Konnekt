import express from "express";
import {
  getAllUsers,
  updateUserRole,
  suspendUser,
  unsuspendUser,
  deleteUser,
  awardBadge,
  verifySkill,
  getPlatformStats,
} from "../controllers/adminController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/isAuth.js";


const router = express.Router();

// All routes require authentication and admin role
router.use(isAuthenticated, authorizeRoles("admin"));

// ===== User Management =====
router.get("/users", getAllUsers);
router.put("/user/:id/role", updateUserRole);
router.put("/user/:id/suspend", suspendUser);
router.put("/user/:id/unsuspend", unsuspendUser);
router.delete("/user/:id", deleteUser);

// ===== Badge Management =====
router.post("/badge/award", awardBadge);

// ===== Skill Verification =====
router.put("/skill/:skillId/verify", verifySkill);

// ===== Platform Statistics =====
router.get("/stats", getPlatformStats);

export default router;
