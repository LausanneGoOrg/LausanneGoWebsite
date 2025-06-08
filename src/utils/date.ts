/**
 * Utility functions for date formatting and manipulation
 * @author Ugo Balducci
 * @version 1.0.0
 */

/**
 * Formats a date string into a localized French format with time
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date and time
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-CH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formats a date string into a short French format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date only
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-CH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Formats time only from a date string
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted time only
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("fr-CH", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Checks if a date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean} - True if date is today
 */
export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Checks if a date is in the past
 * @param {string} dateString - ISO date string
 * @returns {boolean} - True if date is in the past
 */
export const isPast = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return date < now;
};

/**
 * Gets the duration between two dates in hours
 * @param {string} startDate - ISO start date string
 * @param {string} endDate - ISO end date string
 * @returns {number} - Duration in hours
 */
export const getDurationInHours = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
};
