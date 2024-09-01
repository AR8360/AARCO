import { login, signup, verifyOTP } from "../controller/user.controller.js";

import express from "express";

const router = express.Router();

router.post("/login", login);
// router.post("/signup", signup);
router.post("/verify-otp", verifyOTP);

export default router;
