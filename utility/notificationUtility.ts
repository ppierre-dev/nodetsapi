import { ACCOUND_SID, AUTH_TOKEN, TWILIO_NUMBER } from "../config/twilio";

export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let otpExpiry = new Date();
    otpExpiry.setTime(otpExpiry.getTime() + (30 * 60 * 1000));

    return { otp, otpExpiry };
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const client = require('twilio')(ACCOUND_SID, AUTH_TOKEN);
    const response = await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: TWILIO_NUMBER,
        to: `+33${toPhoneNumber}`
    });

    return response;
}