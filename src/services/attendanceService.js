import api from "./api";

const attendanceService = {
  // Scan attendance QR
  scanAttendance: (data) => api.post("/attendance/scan", data),

  // Validate location
  validateLocation: (data) => api.post("/attendance/validate-location", data),

  // Validate IP & GPS
  validateIpGps: (data) => api.post("/attendance/validate-ip-gps", data),

  // Validate device
  validateDevice: (data) => api.post("/attendance/validate-device", data),
};

export default attendanceService;
