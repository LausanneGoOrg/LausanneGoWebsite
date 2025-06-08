import Activity, { fetchActivities } from "@/data/activity";
import Coupon, { fetchUserCoupons } from "@/data/coupon";
import { fetchEvents } from "@/data/event";
import { fetchVisitedLocations } from "@/data/location";
import Profile, {
  fetchProfile,
  fetchCashAmount,
  fetchRanking,
} from "@/data/profile";
import Location from "@/data/location";
import Event from "@/data/event";
import {
  getConfidentialitySettings,
  getNotificationSettings,
} from "@/services/persistentStorage/settingsStorage";
import queryClient from "@/services/queryClient";

/**
 * Hook to prefetch critical data
 * This can be called as early as possible in your app flow
 */
export const usePrefetchCriticalData = (userId?: string) => {
  if (!userId) return;

  // Prefetch critical data
  queryClient.prefetchQuery({
    queryKey: Profile.queryKey(userId),
    queryFn: () => fetchProfile(userId),
  });

  queryClient.prefetchQuery({
    queryKey: ["cashAmount", userId],
    queryFn: () => fetchCashAmount(userId),
  });
};

/**
 * Hook to prefetch all app data
 * This can be called when you know user will need full data soon
 */
export const usePrefetchAllData = (userId?: string) => {
  if (!userId) return;

  // Prefetch critical data first
  usePrefetchCriticalData(userId);

  // Then prefetch non-critical data
  queryClient.prefetchQuery({
    queryKey: Location.queryKeyByUser(userId),
    queryFn: () => fetchVisitedLocations(userId),
  });

  queryClient.prefetchQuery({
    queryKey: ["ranking"],
    queryFn: () => fetchRanking(),
  });

  queryClient.prefetchQuery({
    queryKey: Coupon.queryKeyByUser(userId),
    queryFn: () => fetchUserCoupons(userId),
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: Activity.queryKey(),
    queryFn: ({ pageParam = 0 }) => fetchActivities(pageParam),
    initialPageParam: 0,
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: Event.queryKey(),
    queryFn: ({ pageParam = 0 }) => fetchEvents(pageParam),
    initialPageParam: 0,
  });

  queryClient.prefetchQuery({
    queryKey: ["settings", "confidentiality"],
    queryFn: () => getConfidentialitySettings(),
  });

  queryClient.prefetchQuery({
    queryKey: ["settings", "notification"],
    queryFn: () => getNotificationSettings(),
  });
};

export const usePrefetchGenericData = () => {
  queryClient.prefetchQuery({
    queryKey: ["ranking"],
    queryFn: () => fetchRanking(),
  });

  // queryClient.prefetchQuery({
  //   queryKey: Coupon.queryKeyByUser(userId),
  //   queryFn: () => fetchUserCoupons(userId),
  // });

  queryClient.prefetchInfiniteQuery({
    queryKey: Activity.queryKey(),
    queryFn: ({ pageParam = 0 }) => fetchActivities(pageParam),
    initialPageParam: 0,
  });

  queryClient.prefetchInfiniteQuery({
    queryKey: Event.queryKey(),
    queryFn: ({ pageParam = 0 }) => fetchEvents(pageParam),
    initialPageParam: 0,
  });
};
