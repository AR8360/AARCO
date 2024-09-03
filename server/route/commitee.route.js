import {
  addmember,
  deleteMember,
  getMembers,
} from "../controller/membership.controller.js";
import {
  addRetirment,
  getRetirments,
  deleteRetirment,
} from "../controller/retirement.controller.js";
import express from "express";
const router = express.Router();

router.post("/addmember", addmember);
router.get("/getmembers", getMembers);
router.delete("/deletemember/:id", deleteMember);

router.post("/addretirment", addRetirment);
router.get("/getretirments", getRetirments);
router.delete("/deleteretirment/:id", deleteRetirment);

export default router;
