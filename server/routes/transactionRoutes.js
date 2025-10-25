import express from "express";
import {
  getMyTransactions,
  getTransactionById,
  getAllTransactions,
  addCreditsToUser,
} from "../controllers/transactionController.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/isAuth.js";

const router = express.Router();

// ===== User Routes =====
router.get("/my-transactions", isAuthenticated, getMyTransactions);
router.get("/:id", isAuthenticated, getTransactionById);

// ===== Admin Routes =====
router.get(
  "/admin/all",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllTransactions
);
router.post(
  "/admin/add-credits",
  isAuthenticated,
  authorizeRoles("admin"),
  addCreditsToUser
);

export default router;
