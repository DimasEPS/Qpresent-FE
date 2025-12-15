import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import sessionService from "@/services/sessionService";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sessionService.createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classSessions"] });
    },
  });
};

export const useSessionQR = (sessionId) => {
  return useQuery({
    queryKey: ["sessionQR", sessionId],
    queryFn: () => sessionService.getSessionQR(sessionId),
    enabled: !!sessionId,
    refetchInterval: 30000, // Refresh every 30s
  });
};
