import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOTP = async (phone, otp) => {
  console.log("DEBUG: MOCK_OTP value:", process.env.MOCK_OTP);
  console.log("DEBUG: TWILIO_SID value:", process.env.TWILIO_SID);

  if (!process.env.TWILIO_SID ||
    process.env.TWILIO_SID.includes('PLACEHOLDER') ||
    String(process.env.MOCK_OTP).trim() === 'true') {
    console.log("========================================");
    console.log(`[MOCK OTP] Sending to ${phone}: ${otp}`);
    console.log("========================================");
    return;
  }

  try {
    await client.messages.create({
      body: `Your E-Swastya OTP is ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE,
      to: phone.startsWith('+') ? phone : `+91${phone}`   // India prefix if not present
    });
  } catch (error) {
    console.error("TWILIO EXTERNAL ERROR:", error.message);
    throw new Error(`Twilio Error: ${error.message}. Try enabling MOCK_OTP=true in .env`);
  }
};