import api from "./api";

export const attendanceService = {
  // Scan QR for attendance
  scanQR: async (data) => {
    return api.post("/attendance/scan", data);
  },

  // Validate location
  validateLocation: async (data) => {
    return api.post("/attendance/validate-location", data);
  },

  // Get session QR
  getSessionQR: async (sessionId) => {
    return api.get(`/sessions/${sessionId}/qr`);
  },
};
