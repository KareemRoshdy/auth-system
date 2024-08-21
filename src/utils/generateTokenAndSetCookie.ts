import jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { serialize } from "cookie";

// Generate JWT
export function generateJWT(jwtPayload: JWTPayload): string {
  const privetKey = process.env.JWT_SECRET as string;

  const token = jwt.sign(jwtPayload, privetKey, {
    expiresIn: "7d",
  });

  return token;
}

// Set Cookie with JWT
export function setCookie(jwtPayload: JWTPayload): string {
  const token = generateJWT(jwtPayload);

  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return cookie;
}
