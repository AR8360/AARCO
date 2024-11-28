import {
  addNewUser,
  deleteNewUser,
  getAllUsers,
} from "../controller/newuser.controller.js";
import { verifyToken } from "../utils/VerifyToken.js";

import express from "express";
const router = express.Router();

router.post("/add", addNewUser);
router.delete("/delete", deleteNewUser);
router.get("/all", verifyToken, getAllUsers);

export default router;
