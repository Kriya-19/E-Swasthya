import mongoose from "mongoose";
import FollowUp from "../models/followUp.model.js";
import Patient from "../models/patient.model.js";

/**
 * POST /api/follow-ups
 * Doctor schedules follow-up
 */
export const createFollowUp = async (req, res) => {
  try {
    const { patientId, daysFromToday, followUpDate, reason } = req.body;

    if (!patientId) {
      return res.status(400).json({ message: "patientId required" });
    }

    const doctorId = req.user.id;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    let date;
    if (daysFromToday !== undefined) {
      date = new Date();
      date.setDate(date.getDate() + Number(daysFromToday));
    } else if (followUpDate) {
      date = new Date(followUpDate);
    } else {
      return res.status(400).json({ message: "Date required" });
    }

    const followUp = await FollowUp.create({
      patient: patientId,
      doctor: doctorId,
      followUpDate: date,
      reason
    });

    res.status(201).json({
      success: true,
      data: followUp
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/follow-ups/doctor/me
 */
export const getDoctorFollowUps = async (req, res) => {
  try {
    const followUps = await FollowUp.find({
      doctor: req.user.id
    })
      .populate("patient", "name")
      .sort({ followUpDate: 1 });

    res.json({ data: followUps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/follow-ups/patient/me
 */
export const getPatientFollowUp = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const followUp = await FollowUp.findOne({
      patient: req.user.id,
      followUpDate: { $gte: today }
    })
      .populate("doctor", "name specialization")
      .sort({ followUpDate: 1 });

    res.json({ data: followUp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * PUT /api/follow-ups/:id
 * Doctor OR Patient can reschedule follow-up
 */
export const updateFollowUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { daysFromToday, followUpDate, reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid follow-up ID" });
    }

    const followUp = await FollowUp.findById(id);
    if (!followUp) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    // 🔐 Allow doctor OR patient
    if (
      followUp.doctor.toString() !== req.user.id &&
      followUp.patient.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Doctor-style update
    if (daysFromToday !== undefined) {
      const date = new Date();
      date.setDate(date.getDate() + Number(daysFromToday));
      followUp.followUpDate = date;
    }

    // Patient-style reschedule (THIS FIXES YOUR BUG)
    if (followUpDate) {
      followUp.followUpDate = new Date(followUpDate);
    }

    if (reason !== undefined) {
      followUp.reason = reason;
    }

    await followUp.save();

    res.status(200).json({
      success: true,
      data: followUp
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/follow-ups/:id
 */
export const deleteFollowUp = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid follow-up ID" });
    }

    const followUp = await FollowUp.findById(id);
    if (!followUp) {
      return res.status(404).json({ message: "Follow-up not found" });
    }

    if (followUp.doctor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await followUp.deleteOne();

    res.status(200).json({
      success: true,
      message: "Follow-up deleted"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
