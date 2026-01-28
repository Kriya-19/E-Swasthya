import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function testSMS() {
    console.log("Testing Twilio with SID:", process.env.TWILIO_SID);
    console.log("From Phone:", process.env.TWILIO_PHONE);

    try {
        const message = await client.messages.create({
            body: "Test OTP: 123456",
            from: process.env.TWILIO_PHONE,
            to: "+919999999999" // Use a dummy number or ask user for one, but first check if it even hits Twilio
        });
        console.log("Success! SID:", message.sid);
    } catch (error) {
        console.error("Twilio Error:");
        console.error("Code:", error.code);
        console.error("Message:", error.message);
        console.error("Status:", error.status);
    }
}

testSMS();
