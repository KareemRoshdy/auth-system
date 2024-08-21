import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 ================================================================================================================================
 * @method  GET
 * @route   ~/api/auth/logout
 * @desc    LOGOUT
 * @access  public
 ================================================================================================================================
*/
export async function GET() {
  try {
    cookies().delete("token");

    return NextResponse.json(
      {
        message: "Logged out successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("ERROR_LOGOUT");
    return NextResponse.json({
      message: "Server Error (LOGOUT)",
      err: error.message,
    });
  }
}
