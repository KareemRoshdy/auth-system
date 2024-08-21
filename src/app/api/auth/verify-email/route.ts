import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { sendEmail } from "@/nodemailer/sendEmail";
import { WELCOME_EMAIL_TEMPLATE } from "@/nodemailer/emailTemplates";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/auth/verify-email
 * @desc    VERIFY-EMAIL
 * @access  public
 ================================================================================================================================
*/
export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: code,
        verificationTokenExpiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        isVerified: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired verification code",
        },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: {
        id: user.id,
        email: user.email,
      },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });

    const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", user.name);

    await sendEmail(user.email, "Welcome to Auth System", html);

    return NextResponse.json(
      { user, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR_VERIFY_EMAIL");
    return NextResponse.json(
      { message: "Server Error (VERIFY_EMAIL)", err: error.message },
      { status: 500 }
    );
  }
}
