import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (to, otp) => {
  console.log(to,otp);
 const mailOptions = {
  from: process.env.EMAIL_USER,
  to,
  subject: "Your OTP for Password Reset",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4;">
      <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #333;">🔐 Password Reset Verification</h2>
        <p style="font-size: 16px; color: #555;">
          Use the following OTP to reset your password:
        </p>
        <h1 style="font-size: 32px; color: #007BFF; letter-spacing: 5px;">
          ${otp}
        </h1>
        <p style="font-size: 14px; color: #999;">
          This OTP will expire in <strong>5 minutes</strong>.
        </p>
        <hr />
        <p style="font-size: 12px; color: #aaa;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
    </div>
  `,
};


  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    // console.log("Error sending email: ", error);
    throw error;
  }
};
