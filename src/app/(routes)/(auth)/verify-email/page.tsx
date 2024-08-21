import VerificationEmail from "./_components/VerificationEmail";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Verify Email",
  description:
    "Authentication System login, register, reset-password, and sending emails using nodemailer.",
};

const VerifyEmailPage = () => {
  return <VerificationEmail />;
};

export default VerifyEmailPage;
