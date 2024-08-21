import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPayload } from "@/utils/types";

export function verifyToken(req: NextRequest): JWTPayload | null {
  try {
    const jwtToken = req.cookies.get("token");
    const token = jwtToken?.value as string;

    if (!token) {
      return null;
    }

    const privateKey = process.env.JWT_SECRET as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;

    return userPayload;
  } catch (error) {
    return null;
  }
}

export function verifyTokenForPage(token: string): JWTPayload | null {
  try {
    const privateKey = process.env.JWT_SECRET_KEY as string;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;

    if (!userPayload) return null;

    return userPayload;
  } catch (error) {
    return null;
  }
}
