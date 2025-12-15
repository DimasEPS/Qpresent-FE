import api from "./api";

export const authService = {
  // Register
  register: async (data) => {
    return api.post("/auth/register", data);
  },

  // Verify email OTP
  verifyEmail: async (data) => {
    return api.post("/auth/verify-email", data);
  },

  // Login
  login: async (data) => {
    return api.post("/auth/login", data);
  },

  // Verify device OTP
  verifyDeviceOTP: async (data) => {
    return api.post("/auth/login/verify-otp", data);
  },

  // Logout
  logout: async () => {
    return api.post("/auth/logout");
  },

  // Password reset request
  requestPasswordReset: async (email) => {
    return api.post("/auth/password/reset/request", { email });
  },

  // Password reset confirm
  confirmPasswordReset: async (data) => {
    return api.post("/auth/password/reset/confirm", data);
  },

  // Resend email OTP
  resendEmailOtp: async (email) => {
    return api.post("/auth/resend-email-otp", { email });
  },

  // Resend device OTP
  resendDeviceOtp: async (email, deviceFingerprint) => {
    return api.post("/auth/resend-device-otp", {
      email,
      device_fingerprint: deviceFingerprint,
    });
  },

  // Get user profile
  getProfile: async () => {
    return api.get("/user/profile");
  },

  // Update profile
  updateProfile: async (data) => {
    return api.put("/user/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
