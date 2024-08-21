import ForgotPasswordForm from "./_components/ForgotPasswordForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Authentication System login, register, reset-password, and sending emails using nodemailer.",
};

const ForgotPasswordPage = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
