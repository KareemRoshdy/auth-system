import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateTokenAndSetCookie";
import { sendEmail } from "@/nodemailer/sendEmail";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "@/nodemailer/emailTemplates";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/auth/forgot-password
 * @desc    FORGOT-PASSWORD
 * @access  public
 ================================================================================================================================
*/
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate Reset Password Token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: resetTokenExpiresAt,
      },
    });

    // Send Email
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    );

    await sendEmail(email, "Reset your password", html);

    return NextResponse.json(
      { message: "Password reset link sent to your email" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR_FORGOT_PASSWORD");
    return NextResponse.json({
      message: "Server Error (FORGOT_PASSWORD)",
      err: error.message,
    });
  }
}
