"use client";
import { motion } from "framer-motion";
import React from "react";

interface MotionDivProps {
  children: React.ReactNode;
}

const MotionDiv = ({ children }: MotionDivProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
