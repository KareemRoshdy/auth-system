import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

export const sendEmail = async (userEmail, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.APP_EMAIL_ADDRESS,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
    throw new Error("Internal Server Error (Nodemailer)");
  }
};
