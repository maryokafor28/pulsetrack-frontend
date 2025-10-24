// src/services/authApi.ts
import { apiFetch } from "../lib/api";
import { DoctorAPI } from "./doctorApi"; // ✅ Import to create doctor profiles
import type { User } from "@/lib/types";

export const AuthAPI = {
  // ✅ Signup user and auto-create doctor if applicable
  signup: async (data: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "doctor";
    specialization?: string;
  }) => {
    // Step 1: Create user account
    const res = await apiFetch<{
      success: boolean;
      data: {
        token: string;
        user: User;
      };
    }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // ✅ Save token to localStorage
    localStorage.setItem("token", res.data.token);

    // Step 2: Auto-create doctor profile if the role is doctor
    if (data.role === "doctor") {
      try {
        await DoctorAPI.create({
          name: data.name,
          email: data.email,
          specialization: data.specialization || "General",
        });
      } catch (err) {
        console.error("Failed to auto-create doctor profile:", err);
      }
    }

    return res;
  },

  // ✅ Signin user
  signin: async (data: { email: string; password: string }) => {
    const res = await apiFetch<{
      data: {
        token: string;
        user: User;
      };
    }>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });

    // ✅ Store token
    localStorage.setItem("token", res.data.token);
    return res;
  },

  // ✅ Get logged-in user
  getMe: async () => {
    const res = await apiFetch<{
      success: boolean;
      data: User;
    }>("/auth/me");
    return res.data;
  },
};
