import {
  CategoryDefinitions,
  CategoryId,
  filterByCategory,
  getCategoriesFilters,
  getTranslatedAll,
  mapActivityTypeToCategory,
  mapEventTypeToCategory,
} from "@/constants/Categories";
import { Router } from "expo-router";
import { useEffect, useState, useMemo } from "react";
import { useActivities } from "../use-activities";
import { useEvents } from "../use-events";
import { i18n } from "@lingui/core";

/**
 * Hook to fetch activities and events
 * @param router the router
 * @returns the activities and events, the current tab, the set tab function, the filters, the current filters, and the set current filters function
 */
export function useActivitiesScreen(router: Router) {
  const [tab, setTab] = useState<"activities" | "events">("activities");
  const categoriesFilters = getCategoriesFilters(i18n);
  const allText = getTranslatedAll(i18n);
  const [filters, setFilters] = useState<string[]>([
    allText,
    ...categoriesFilters.activity.list,
  ]);
  const [currentFilters, setCurrentFilters] = useState<string[]>([allText]);

  // When the tab changes, update the filters
  useEffect(() => {
    const categoriesFilters = getCategoriesFilters(i18n);
    const allText = getTranslatedAll(i18n);
    if (tab === "activities") {
      setFilters([allText, ...categoriesFilters.activity.list]);
      setCurrentFilters([allText]);
    } else {
      setFilters([allText, ...categoriesFilters.event.list]);
      setCurrentFilters([allText]);
    }
  }, [tab]);

  const {
    activities,
    isLoading: activitiesLoading,
    fetchNextPage: fetchNextActivities,
    hasNextPage: hasNextActivities,
    isFetchingNextPage: isFetchingNextActivities,
  } = useActivities();

  const {
    events,
    isLoading: eventsLoading,
    fetchNextPage: fetchNextEvents,
    hasNextPage: hasNextEvents,
    isFetchingNextPage: isFetchingNextEvents,
  } = useEvents();

  const fetchNextPage = () => {
    if (
      tab === "activities" &&
      hasNextActivities &&
      !isFetchingNextActivities
    ) {
      fetchNextActivities();
    } else if (tab === "events" && hasNextEvents && !isFetchingNextEvents) {
      fetchNextEvents();
    }
  };

  const filteredActivities = useMemo(() => {
    const allText = getTranslatedAll(i18n);
    if (currentFilters.includes(allText)) {
      return activities;
    }

    return activities.filter((item) => {
      if (!item.type) return false;
      const category = mapActivityTypeToCategory(i18n, item.type);
      return currentFilters.includes(category);
    });
  }, [activities, currentFilters]);

  const filteredEvents = useMemo(() => {
    const allText = getTranslatedAll(i18n);
    if (currentFilters.includes(allText)) {
      return events;
    }

    return events.filter((item) => {
      if (!item.type) return false;
      const category = mapEventTypeToCategory(i18n, item.type);
      return currentFilters.includes(category);
    });
  }, [events, currentFilters]);

  const isLoading = tab === "activities" ? activitiesLoading : eventsLoading;
  const isFetchingNext =
    tab === "activities" ? isFetchingNextActivities : isFetchingNextEvents;
  const hasNext = tab === "activities" ? hasNextActivities : hasNextEvents;

  return [
    filteredActivities,
    filteredEvents,
    tab,
    setTab,
    filters,
    currentFilters,
    setCurrentFilters,
    fetchNextPage,
    isLoading,
    isFetchingNext,
    hasNext,
  ] as const;
}
