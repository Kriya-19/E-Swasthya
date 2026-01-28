import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createFollowUp,
  getDoctorFollowUps,
  getPatientFollowUp,
  updateFollowUp,
  deleteFollowUp
} from "../controllers/followUp.controller.js";

const router = express.Router();

router.post("/", protect, createFollowUp);

router.get("/doctor/me", protect, getDoctorFollowUps);
router.get("/patient/me", protect, getPatientFollowUp);

/* ✅ ADD THESE */
router.put("/:id", protect, updateFollowUp);
router.delete("/:id", protect, deleteFollowUp);

export default router;
