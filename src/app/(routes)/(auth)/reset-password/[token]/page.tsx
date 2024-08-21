import ResetPasswordForm from "../_components/ResetPasswordForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Authentication System login, register, reset-password, and sending emails using nodemailer.",
};

interface ResetPasswordTokenProps {
  params: {
    token: string;
  };
}

const ResetPasswordToken = ({ params: { token } }: ResetPasswordTokenProps) => {
  return (
    <div className="w-full flex items-center justify-center">
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordToken;
