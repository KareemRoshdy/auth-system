import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/nodemailer/sendEmail";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "@/nodemailer/emailTemplates";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/auth/reset-password
 * @desc    RESET-PASSWORD
 * @access  public
 ================================================================================================================================
*/
interface Props {
  params: { token: string };
}

export async function POST(req: NextRequest, { params: { token } }: Props) {
  try {
    const { password } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: { gt: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiresAt: null,
      },
    });

    const html = PASSWORD_RESET_SUCCESS_TEMPLATE;
    await sendEmail(user.email, "Password reset successfully", html);

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR_RESET_PASSWORD");
    return NextResponse.json({
      message: "Server Error (RESET_PASSWORD)",
      err: error.message,
    });
  }
}
