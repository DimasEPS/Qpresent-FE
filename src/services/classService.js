import api from "./api";

const classService = {
  // Get all classes (my classes)
  getMyClasses: () => api.get("/classes"),

  // Get class detail
  getClassDetail: (classId) => api.get(`/classes/${classId}`),

  // Create new class
  createClass: (data) => api.post("/classes", data),

  // Update class
  updateClass: (classId, data) => api.put(`/classes/${classId}`, data),

  // Delete class
  deleteClass: (classId) => api.delete(`/classes/${classId}`),

  // Regenerate class code
  regenerateCode: (classId) => api.post(`/classes/${classId}/code/regenerate`),

  // Join class (student)
  joinClass: (code) => api.post("/classes/join", { code }),

  // Get class members
  getClassMembers: (classId) => api.get(`/classes/${classId}/members`),

  // Add class member
  addClassMember: (classId, data) =>
    api.post(`/classes/${classId}/members`, data),

  // Remove class member
  removeClassMember: (classId, memberId) =>
    api.delete(`/classes/${classId}/members/${memberId}`),

  // Get class sessions
  getClassSessions: (classId) => api.get(`/classes/${classId}/sessions`),
};

export default classService;
