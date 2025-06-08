import Activity, { fetchActivity, fetchActivities } from "@/data/activity";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useProfile } from "./use-profile";

export const useActivities = () => {
  const { profile } = useProfile();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: Activity.queryKey(),
      queryFn: ({ pageParam = 0 }) => fetchActivities(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < 20 ? undefined : allPages.length;
      },
      initialPageParam: 0,
    });

  // Aplatir les pages pour obtenir tous les éléments
  let activities = data?.pages.flat() || [];

  return {
    activities,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } as const;
};

export const useActivityById = (activityId: string) => {
  const {
    data: activity,
    isLoading,
    error,
  } = useQuery({
    queryKey: Activity.queryKeyById(activityId),
    queryFn: () => fetchActivity(activityId),
  });

  return {
    activity: activity || null,
    isLoading,
    error,
  } as const;
};

export const useActivitiesByBusiness = (businessId: string) => {
  const { profile } = useProfile();

  const { data, isLoading, error } = useQuery({
    queryKey: ["activities", "business", businessId],
    queryFn: async () => {
      // Si l'utilisateur est admin, retourner toutes les activités
      if (profile?.is_admin) {
        return await fetchActivities(0, 100);
      }

      // Sinon, filtrer par business_id
      const allActivities = await fetchActivities(0, 100);
      return allActivities.filter(
        (activity) => activity.business_id === businessId
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
