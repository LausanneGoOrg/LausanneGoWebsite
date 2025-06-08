import { useQuery } from "@tanstack/react-query";
import { fetchChallenges } from "@/data/challenge";
import { useProfile } from "./use-profile";

export const useChallenges = () => {
  const { profile } = useProfile();

  const { data, isLoading } = useQuery({
    queryKey: ["challenges"],
    queryFn: () => fetchChallenges(),
  });

  let challenges = data || [];

  // Si l'utilisateur n'est pas admin, filtrer par business_id
  if (profile && !profile.is_admin) {
    // TODO: Implement business filtering when user has business_id
    // For now, return all challenges for non-admin users too
  }

  return {
    challenges,
    isLoading,
  } as const;
};

export const useChallengesByBusiness = (businessId: string) => {
  const { profile } = useProfile();

  const { data, isLoading, error } = useQuery({
    queryKey: ["challenges", "business", businessId],
    queryFn: async () => {
      // Si l'utilisateur est admin, retourner tous les défis
      if (profile?.is_admin) {
        return await fetchChallenges();
      }

      // Sinon, filtrer par business_id
      const allChallenges = await fetchChallenges();
      return allChallenges.filter(
        (challenge) => challenge.business_id === businessId
      );
    },
    enabled: !!businessId || !!profile?.is_admin,
  });

  return {
    data: data || [],
    isLoading,
    error,
  } as const;
};
