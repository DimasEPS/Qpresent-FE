import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

// Get user profile
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Update profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// Password reset request
export const usePasswordResetRequest = () => {
  return useMutation({
    mutationFn: authService.requestPasswordReset,
  });
};

// Password reset confirm
export const usePasswordResetConfirm = () => {
  return useMutation({
    mutationFn: authService.confirmPasswordReset,
  });
};
