import { useMutation, useQuery } from "@tanstack/react-query";
import { attendanceService } from "@/services/attendance.service";

// Scan QR for attendance
export const useScanQR = () => {
  return useMutation({
    mutationFn: attendanceService.scanQR,
  });
};

// Validate location
export const useValidateLocation = () => {
  return useMutation({
    mutationFn: attendanceService.validateLocation,
  });
};

// Get session QR
export const useSessionQR = (sessionId) => {
  return useQuery({
    queryKey: ["sessionQR", sessionId],
    queryFn: () => attendanceService.getSessionQR(sessionId),
    enabled: !!sessionId,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });
};
