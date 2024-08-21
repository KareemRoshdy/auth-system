import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateTokenAndSetCookie";

/**
 ================================================================================================================================
 * @method  POST
 * @route   ~/api/auth/logout
 * @desc    LOGIN
 * @access  public
 ================================================================================================================================
*/
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    const cookie = setCookie({
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    });

    return NextResponse.json(
      { user, message: "Logged in successfully" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error: any) {
    console.log("ERROR_LOGIN");
    return NextResponse.json({
      message: "Server Error (LOGIN)",
      err: error.message,
    });
  }
}
