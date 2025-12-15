import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { generateFingerprint } from "@/lib/device";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const fingerprint = generateFingerprint();
    const response = await authService.login({
      email,
      password,
      device_fingerprint: fingerprint,
    });

    console.log("Login response:", response); // Debug log

    // Admin/Lecturer bypass logic
    const isAdminOrLecturer =
      email.startsWith("admin@") ||
      email.includes(".lecturer@") ||
      email.includes("lecturer.");

    // Check if device OTP required (only for students)
    if (
      response.data?.requires_device_verification === true &&
      !isAdminOrLecturer
    ) {
      return {
        requiresOTP: true,
        tempData: response.data,
      };
    }

    // Direct login success - token received
    if (response.data?.token) {
      const authToken = response.data.token;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(null); // Will be fetched by dashboard

      return { requiresOTP: false, success: true };
    }

    // Unexpected response format
    throw new Error("Invalid response from server");
  };

  const verifyDeviceOTP = async (email, otp) => {
    const fingerprint = generateFingerprint();
    const response = await authService.verifyDeviceOTP({
      email,
      otp_code: otp,
      device_fingerprint: fingerprint,
    });

    if (response.data?.token) {
      const authToken = response.data.token;

      // Just save token, user will be null initially
      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(null); // Will be fetched by dashboard
    }

    return response;
  };

  const register = async (data) => {
    return authService.register(data);
  };

  const verifyEmail = async (email, otp) => {
    const response = await authService.verifyEmail({ email, otp_code: otp });

    // Email verification only confirms email, no token returned
    // User needs to login after email verification
    return response;
  };
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    loading,
    login,
    verifyDeviceOTP,
    register,
    verifyEmail,
    logout,
    updateUser,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
