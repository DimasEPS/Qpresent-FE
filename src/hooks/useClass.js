import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import classService from "@/services/classService";

// Get my classes
export const useMyClasses = (params = {}) => {
  return useQuery({
    queryKey: ["classes", params],
    queryFn: () => classService.getMyClasses(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Join class
export const useJoinClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: classService.joinClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

// Create class
export const useCreateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classService.createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

// Update class
export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, data }) => classService.updateClass(classId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

// Delete class
export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classService.deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

// Regenerate code
export const useRegenerateCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: classService.regenerateCode,
    onSuccess: (_, classId) => {
      queryClient.invalidateQueries({ queryKey: ["class", classId] });
    },
  });
};

// Add member
export const useAddMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, data }) =>
      classService.addClassMember(classId, data),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ["classMembers", classId] });
    },
  });
};

// Remove member
export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, memberId }) =>
      classService.removeClassMember(classId, memberId),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ["classMembers", classId] });
    },
  });
};

// Get class detail
export const useClassDetail = (classId) => {
  return useQuery({
    queryKey: ["class", classId],
    queryFn: () => classService.getClassDetail(classId),
    enabled: !!classId,
    staleTime: 2 * 60 * 1000,
  });
};

// Get class members
export const useClassMembers = (classId, params = {}) => {
  return useQuery({
    queryKey: ["classMembers", classId, params],
    queryFn: () => classService.getClassMembers(classId, params),
    enabled: !!classId,
    staleTime: 2 * 60 * 1000,
  });
};

// Get class sessions
export const useClassSessions = (classId, params = {}) => {
  return useQuery({
    queryKey: ["classSessions", classId, params],
    queryFn: () => classService.getClassSessions(classId, params),
    enabled: !!classId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
