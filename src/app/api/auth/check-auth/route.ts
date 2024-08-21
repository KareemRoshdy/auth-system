import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyToken } from "@/middleware/verifyToken";

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/auth/check-auth
 * @desc    CHECK-AUTH
 * @access  public
 ================================================================================================================================
*/

export async function GET(req: NextRequest) {
  try {
    const userPayload = verifyToken(req);

    if (!userPayload) {
      return NextResponse.json({ message: "Unauthorized - no token provided" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userPayload?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
        lastLogin: true,
        isVerified: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log("ERROR_CHECK_AUTH", error.message);
    return NextResponse.json("Server Error", { status: 500 });
  }
}
