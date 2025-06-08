import { fetchRanking } from "@/data/profile";
import { useQuery } from "@tanstack/react-query";

export const useRanking = () => {
  const { data: ranking, isLoading } = useQuery({
    queryKey: ["ranking"],
    queryFn: () => fetchRanking(),
  });

  return {
    ranking: ranking || [], // Valeur par défaut si ranking est undefined
    isLoading,
  } as const;
};
