import express from "express";
import {
  createReview,
  getUserReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/isAuth.js";

const router = express.Router();

// ===== Public Routes =====
router.get("/user/:userId", getUserReviews);

// ===== Authenticated Routes =====
router.post("/create", isAuthenticated, createReview);
router.get("/my-reviews", isAuthenticated, getMyReviews);
router.put("/:id", isAuthenticated, updateReview);
router.delete("/:id", isAuthenticated, deleteReview);

export default router;
