import Profile, { fetchProfile, updateProfile } from "@/data/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserId } from "./use-user";
import { supabase } from "@/services/database";
import { useSnackbarMessage } from "./use-snackbar";

export const useProfile = () => {
  const userId = useUserId();

  const { data, isLoading } = useQuery({
    queryKey: Profile.queryKey(userId ?? ""),
    queryFn: () => fetchProfile(userId ?? ""),
    enabled: !!userId,
  });

  return {
    profile: data,
    isLoading,
  };
};

/**
 * Hook to check if the current user is an admin
 */
export const useIsAdmin = () => {
  const { profile, isLoading } = useProfile();

  return {
    isAdmin: profile?.is_admin || false,
    isLoading,
  };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const snackbarMessage = useSnackbarMessage();
  const userId = useUserId();

  return useMutation({
    mutationFn: async (profile: any) => updateProfile(profile),
    mutationKey: ["updateProfile"],
    onSuccess: async (data) => {
      queryClient.setQueryData(Profile.queryKey(userId ?? ""), data);
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  const userId = useUserId();
  const snackbarMessage = useSnackbarMessage();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.admin.deleteUser(userId ?? "");
      if (error) throw new Error(error.message);
    },
    mutationKey: ["deleteProfile"],
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: Profile.queryKey(userId ?? ""),
      });
    },
  });
};
