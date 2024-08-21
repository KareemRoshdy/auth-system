"use client";

import { useAuthStore } from "@/store/authStore";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

import { ArrowLeft, Mail } from "lucide-react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import MotionDiv from "@/components/MotionDiv";
import FormHeading from "@/components/FormHeading";
import Link from "next/link";
import toast from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const isValid = email !== "";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <MotionDiv>
      <div className="px-3 py-6 md:px-6">
        <FormHeading label="Forgot Password" />

        {!isSubmitted ? (
          <form onSubmit={onSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>

            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              label="Send Reset Link"
              isLoading={isLoading}
              isValid={isValid}
            />
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              className="size-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Mail className="size-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link
          href="/login"
          className="text-sm text-green-400 hover:underline flex items-center"
        >
          <ArrowLeft className="size-4 mr-2" /> Back to Login
        </Link>
      </div>
    </MotionDiv>
  );
};

export default ForgotPasswordForm;
