import { sendOTP } from "./utils/sendSms.utils.js";
import dotenv from "dotenv";
dotenv.config();

async function testMockOTP() {
    console.log("Testing Mock OTP...");
    try {
        await sendOTP("1234567890", "999888");
        console.log("Mock OTP test completed. Check console logs above for output.");
    } catch (err) {
        console.error("Test failed:", err);
    }
}

testMockOTP();
