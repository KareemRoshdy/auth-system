import SignUpForm from "./_components/SignUpForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Authentication System login, register, reset-password, and sending emails using nodemailer.",
};

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
