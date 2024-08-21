import { User } from "@prisma/client";
import axios from "axios";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  message: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  message: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error logging in ",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.get("/api/auth/logout");
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error logging out ",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`/api/auth/verify-email`, { code });

      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error verify email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/auth/check-auth`);

      set({
        user: response.data,
        isAuthenticated: true,
        isCheckingAuth: false,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error check auth",
        isLoading: false,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
      throw error;
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`/api/auth/forgot-password`, { email });

      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error forgot password",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token: string, password: string) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`/api/auth/reset-password/${token}`, {
        password,
      });

      set({
        message: response.data.message,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response.data.message || "Error reset password",
        isLoading: false,
      });
      throw error;
    }
  },
}));
