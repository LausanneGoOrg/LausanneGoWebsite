import { QueryClient } from "@tanstack/react-query";

// Create a QueryClient to be used throughout the app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default options for all queries
      staleTime: 60 * 1000, // 1 minute
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Define query keys for better organization and type safety
export const queryKeys = {
  profile: (userId: string) => ["profile", userId],
  badges: (userId: string) => ["badges", userId],
  ranking: () => ["ranking"],
  cashAmount: (userId: string) => ["cashAmount", userId],
  coupons: (userId: string) => ["coupons", userId],
  activities: () => ["activities"],
  events: () => ["events"],
  confidentialitySettings: () => ["settings", "confidentiality"],
  notificationSettings: () => ["settings", "notification"],
};

export default queryClient;
