"use client";

import Button from "@/components/Button";
import FormFooter from "@/components/FormFooter";
import Input from "@/components/Input";
import { Lock, Mail, User } from "lucide-react";
import { FormEvent, useState } from "react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MotionDiv from "@/components/MotionDiv";
import FormHeading from "@/components/FormHeading";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { signup, isLoading, error } = useAuthStore();

  const isValid = name !== "" && email !== "" && password !== "";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      router.push("/verify-email");
      toast.success("Verify your email");
    } catch {
      toast.error(error);
    }
  };

  return (
    <MotionDiv>
      <div className="px-3 py-6 md:px-6">
        <FormHeading label="Create Account" />

        <form onSubmit={onSubmit}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm  mt-2">{error}</p>}

          <PasswordStrengthMeter password={password} />

          <Button label="Sign Up" isLoading={isLoading} isValid={isValid} />
        </form>
      </div>

      <FormFooter text="Already have an account?" link="/login" label="Login" />
    </MotionDiv>
  );
};

export default SignUpForm;
