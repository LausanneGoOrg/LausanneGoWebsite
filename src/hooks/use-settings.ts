import {
  getConfidentialitySettings,
  getNotificationSettings,
  storeConfidentialitySettings,
  storeNotificationSettings,
} from "@/services/persistentStorage/settingsStorage";
import queryClient from "@/services/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNotificationsSettings = () => {
  const { data: settings } = useQuery({
    queryKey: ["settings", "notifications"],
    queryFn: () => getNotificationSettings(),
    initialData: {
      pushNotifications: false,
      challengeNotifications: false,
      eventNotifications: false,
      promotionsNotifications: false,
    },
  });

  return settings;
};

export const useChangeNotificationsSettings = () => {
  return useMutation({
    mutationFn: (newSettings: {
      pushNotifications: boolean;
      challengeNotifications: boolean;
      eventNotifications: boolean;
      promotionsNotifications: boolean;
    }) => storeNotificationSettings(newSettings),
    mutationKey: ["settings", "notifications"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "notifications"],
      });
    },
  });
};

export const useConfidentialitySettings = () => {
  const { data: settings } = useQuery({
    queryKey: ["settings", "confidentiality"],
    queryFn: () => getConfidentialitySettings(),
    initialData: {
      accessPosition: false,
      personalizedVisits: false,
    },
  });

  return settings;
};

export const useChangeConfidentialitySettings = () => {
  return useMutation({
    mutationFn: (newSettings: {
      accessPosition: boolean;
      personalizedVisits: boolean;
    }) => storeConfidentialitySettings(newSettings),
    mutationKey: ["settings", "confidentiality"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "confidentiality"],
      });
    },
  });
};
