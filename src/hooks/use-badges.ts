import { useQuery } from "@tanstack/react-query";
import { useUserId } from "./use-user";
import Location, { fetchVisitedLocations } from "@/data/location";

export const useBadges = () => {
  const userId = useUserId();

  const {
    data: badges,
    error,
    isLoading,
  } = useQuery({
    queryKey: Location.queryKeyByUser(userId ?? ""),
    queryFn: () => fetchVisitedLocations(userId ?? ""),
    enabled: !!userId,
  });

  return {
    badges: badges || [], // Valeur par défaut si badges est undefined
    isLoading,
  } as const;
};
