import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timezone header
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    config.headers["X-App-Timezone"] = timezone;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor untuk handle error
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      // Only redirect if not already on login page to avoid loop
      if (!window.location.pathname.includes("/login")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }

    const errorMessage =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      error.response?.data?.error ||
      "An error occurred";

    return Promise.reject({
      message: errorMessage,
      code: error.response?.data?.error?.code,
      details: error.response?.data?.error?.details,
      status: error.response?.status,
    });
  }
);

export default api;
