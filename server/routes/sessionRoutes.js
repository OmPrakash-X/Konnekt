import express from "express";
import {
  createSession,
  getMySessions,
  getSessionById,
  confirmSession,
  completeSession,
  cancelSession,
  updateSession,
} from "../controllers/sessionController.js";
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

// ===== All routes require authentication =====
router.use(isAuthenticated);

// Session CRUD
router.post("/create", createSession);
router.get("/my-sessions", getMySessions);
router.get("/:id", getSessionById);
router.put("/:id/update", updateSession);

// Session status management
router.put("/:id/confirm", confirmSession);
router.put("/:id/complete", completeSession);
router.put("/:id/cancel", cancelSession);

export default router;
