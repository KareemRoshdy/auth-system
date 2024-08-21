import LoginForm from "./_components/LoginForm";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description:
    "Authentication System login, register, reset-password, and sending emails using nodemailer.",
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
