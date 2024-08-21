"use client";

import Button from "@/components/Button";
import FormFooter from "@/components/FormFooter";
import FormHeading from "@/components/FormHeading";
import Input from "@/components/Input";
import MotionDiv from "@/components/MotionDiv";
import { useAuthStore } from "@/store/authStore";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const isValid = email !== "" && password !== "";

  const { login, isLoading, error } = useAuthStore();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);

      router.push("/");
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <MotionDiv>
      <div className="px-3 py-6 md:px-6">
        <FormHeading label="Welcome Back" />

        <form onSubmit={onSubmit}>
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

          <div className="flex items-center mb-1">
            <Link
              href={`/forgot-password`}
              className="text-sm text-green-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm  mt-2">{error}</p>}

          <Button label="Login" isLoading={isLoading} isValid={isValid} />
        </form>
      </div>

      <FormFooter text="Don't have an account?" link="/signup" label="SignUp" />
    </MotionDiv>
  );
};

export default LoginForm;
