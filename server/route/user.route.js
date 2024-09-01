import {
  loginorSinup,
  verifyOTP,
  changeMemberStatusToAdmin,
} from "../controller/user.controller.js";

import { verifyAdmin } from "../utils/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/loginorsignup", loginorSinup);
router.post("/verify-otp", verifyOTP);
router.post("/change-status", verifyAdmin, changeMemberStatusToAdmin);
export default router;
