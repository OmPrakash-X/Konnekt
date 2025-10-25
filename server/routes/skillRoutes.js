import express from "express";
import {
  createSkill,
  getAllSkills,
  getSkillById,
  getMySkills,
  updateSkill,
  deleteSkill,
  endorseSkill,
  getSkillsByCategory,
} from "../controllers/skillController.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

// ===== Public Routes =====
router.get("/all", getAllSkills);
router.get("/:id", getSkillById);
router.get("/category/:category", getSkillsByCategory);

// ===== Authenticated Routes =====
router.post("/create", isAuthenticated, createSkill);
router.get("/my/skills", isAuthenticated, getMySkills);
router.put("/:id", isAuthenticated, updateSkill);
router.delete("/:id", isAuthenticated, deleteSkill);
router.post("/:id/endorse", isAuthenticated, endorseSkill);

export default router;
