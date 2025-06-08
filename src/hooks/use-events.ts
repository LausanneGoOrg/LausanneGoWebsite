import Event, { fetchEvent, fetchEvents } from "@/data/event";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useProfile } from "./use-profile";

export const useEvents = () => {
  const { profile } = useProfile();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: Event.queryKey(),
      queryFn: ({ pageParam = 0 }) => fetchEvents(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length < 20 ? undefined : allPages.length;
      },
      initialPageParam: 0,
    });

  // Aplatir les pages pour obtenir tous les éléments
  let events = data?.pages.flat() || [];

  return {
    events,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } as const;
};

export const useEventById = (eventId: string) => {
  const { data: event, isLoading } = useQuery({
    queryKey: Event.queryKeyById(eventId),
    queryFn: () => fetchEvent(eventId),
  });

  return {
    event: event || null, // Valeur par défaut si event est undefined
    isLoading,
  } as const;
};

export const useNextEvents = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nextEvents"],
    queryFn: () => fetchEvents(0, 20),
  });

  return {
    events: data || [],
    isLoading,
  } as const;
};

/**
 * Hook to fetch a specific event by ID
 */
export const useEvent = (eventId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: Event.queryKeyById(eventId),
    queryFn: () => fetchEvent(eventId),
    enabled: !!eventId,
  });

  return {
    data,
    isLoading,
    error,
  } as const;
};

export const useEventsByBusiness = (businessId: string) => {
  const { profile } = useProfile();

  const { data, isLoading, error } = useQuery({
    queryKey: ["events", "business", businessId],
    queryFn: async () => {
      // Si l'utilisateur est admin, retourner tous les événements
      if (profile?.is_admin) {
        return await fetchEvents(0, 100);
      }

      // Sinon, filtrer par business_id
      const allEvents = await fetchEvents(0, 100);
      return allEvents.filter((event) => event.business_id === businessId);
    },
    enabled: !!businessId || !!profile?.is_admin,
  });

  return {
    data: data || [],
    isLoading,
    error,
  } as const;
};
