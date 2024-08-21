import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { setCookie } from "@/utils/generateTokenAndSetCookie";
import { sendEmail } from "@/nodemailer/sendEmail";
import { VERIFICATION_EMAIL_TEMPLATE } from "@/nodemailer/emailTemplates";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/auth/signup
 * @desc    SIGNUP
 * @access  public
 ================================================================================================================================
*/
export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken: verificationCode,
        verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 Hours
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        isVerified: true,
        verificationToken: true,
        verificationTokenExpiresAt: true,
      },
    });

    // JWT
    const cookie = setCookie({
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    });

    // Send OTP Code to user email
    const html = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationCode
    );
    await sendEmail(user.email, "Verify your email", html);

    return NextResponse.json(user, {
      status: 201,
      headers: { "Set-Cookie": cookie },
    });
  } catch (error: any) {
    console.log("ERROR_SIGN_UP");
    return NextResponse.json(
      { message: "Server Error (SIGNUP)", err: error.message },
      { status: 500 }
    );
  }
}
