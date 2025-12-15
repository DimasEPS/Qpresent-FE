import api from "./api";

export const classService = {
  // Get user's classes
  getMyClasses: async (params) => {
    return api.get("/classes", { params });
  },

  // Join class with code
  joinClass: async (classCode) => {
    return api.post("/classes/join", { code: classCode });
  },

  // Get class detail
  getClassDetail: async (classId) => {
    return api.get(`/classes/${classId}`);
  },

  // Get class members
  getClassMembers: async (classId, params) => {
    return api.get(`/classes/${classId}/members`, { params });
  },

  // Get class sessions
  getClassSessions: async (classId, params) => {
    return api.get(`/classes/${classId}/sessions`, { params });
  },
};
