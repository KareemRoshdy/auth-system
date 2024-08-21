"use client";

import { motion } from "framer-motion";
import { Loader } from "lucide-react";

interface ButtonProps {
  label: string;
  isLoading: boolean;
  isValid?: boolean;
}

const Button = ({ label, isLoading, isValid }: ButtonProps) => {
  return (
    <motion.button
      className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="submit"
      disabled={isLoading || !isValid}
    >
      {isLoading ? <Loader className="w-6 h-6 animate-spin m-auto" /> : label}
    </motion.button>
  );
};

export default Button;
