import mongoose from "mongoose";

const followUpSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    followUpDate: {
      type: Date,
      required: true
    },
    reason: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("FollowUp", followUpSchema);
