import api from "./api";

const anomalyService = {
  // Get all anomalies
  getAnomalies: (params) => api.get("/anomalies", { params }),

  // Get anomaly detail
  getAnomalyDetail: (anomalyId) => api.get(`/anomalies/${anomalyId}`),
};

export default anomalyService;
