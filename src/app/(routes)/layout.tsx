import React from "react";
import FloatingShape from "@/components/FloatingShape";
import ToastProvider from "@/components/providers/ToastProvider";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Auth System",
  description:
    "Authentication System login, register, reset-password, and sending emails using nodemailer.",
};

interface RoutesLayoutProps {
  children: React.ReactNode;
}


const RoutesLayout = ({ children }: RoutesLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <ToastProvider />

      <main className="w-full h-full flex items-center justify-center p-2 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default RoutesLayout;
