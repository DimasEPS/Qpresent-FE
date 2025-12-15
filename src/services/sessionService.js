import api from "./api";

const sessionService = {
  // Create new session
  createSession: (data) => api.post("/sessions", data),

  // Get QR code for session
  getSessionQR: (sessionId) => api.get(`/sessions/${sessionId}/qr`),
};

export default sessionService;
