import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwtToken = req.cookies.get("token");
  const token = jwtToken?.value as string;
  if (!token) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // return null;
  } else {
    if (
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/signup", "/login"],
};
