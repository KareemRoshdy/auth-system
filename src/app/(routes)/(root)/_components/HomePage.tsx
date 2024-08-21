"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import LoadingSpinner from "@/components/LoadingSpinner";
import { formatDate } from "@/utils/formaDate";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import FormHeading from "@/components/FormHeading";

const HomePage = () => {
  const router = useRouter();

  const { isCheckingAuth, checkAuth, logout, user, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  if (user?.isVerified !== undefined) {
    !user?.isVerified && router.push("/verify-email");
  }

  const onCLick = async () => {
    try {
      await logout();
      router.refresh();
      toast.success("Logging out successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <motion.div
      className="max-w-md w-full mt-10 mx-auto px-3 py-8 md:p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <FormHeading label="Dashboard" />

      <div className="space-y-6">
        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user?.name}</p>
          <p className="text-gray-300">Email: {user?.email}</p>
        </motion.div>

        <motion.div
          className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>

          {user?.createdAt && (
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}

          {user?.lastLogin && (
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>
              {formatDate(user?.lastLogin)}
            </p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4"
      >
        <motion.button
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onCLick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin m-auto" />
          ) : (
            "Logout"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
