import { cookies } from "next/headers";
import HomePage from "./_components/HomePage";
import { redirect } from "next/navigation";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Authentication System login, register, reset-password, and sending emails using nodemailer.",
};

export default function Home() {
  const jwtToken = cookies().get("token");
  const token = jwtToken?.value as string;

  if (!token) redirect("/login");

  return (
    <div className="w-full">
      <HomePage />
    </div>
  );
}
