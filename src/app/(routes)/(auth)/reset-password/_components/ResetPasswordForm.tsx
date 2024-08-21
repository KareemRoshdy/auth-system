"use client";

import Button from "@/components/Button";
import FormHeading from "@/components/FormHeading";
import Input from "@/components/Input";
import MotionDiv from "@/components/MotionDiv";
import { useAuthStore } from "@/store/authStore";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const isValid = password !== "" && confirmPassword !== "";

  const { resetPassword, isLoading, error, message } = useAuthStore();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully, redirecting to login page");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message || "Error resetting password");
    }
  };

  return (
    <MotionDiv>
      <div className="px-3 py-6 md:px-6">
        <FormHeading label="Reset Password" />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <form onSubmit={onSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            label="Set New Password"
            isValid={isValid}
            isLoading={isLoading}
          />
        </form>
      </div>
    </MotionDiv>
  );
};

export default ResetPasswordForm;
