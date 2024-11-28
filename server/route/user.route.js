import {
  login,
  register,
  generateMemberOTP,
  verifyMemberOTP,
  allunregisterUser,
  deleteUnregisterUser,
  approveUser,
  changeMemberStatusToAdmin,
  logout,
} from "../controller/user.controller.js";

import { verifyAdmin } from "../utils/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/generate-otp", generateMemberOTP);
router.post("/verify-otp", verifyMemberOTP);
router.get("/all-unregister-user", verifyAdmin, allunregisterUser);
router.post("/approve-user", verifyAdmin, approveUser);
router.post("/delete-unregister-user", verifyAdmin, deleteUnregisterUser);
router.post("/change-status", verifyAdmin, changeMemberStatusToAdmin);
router.post("/logout", logout);
export default router;
