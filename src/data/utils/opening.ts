export interface RegularHours {
  day: number; // 0-6 (Monday-Sunday)
  open?: string; // "HH:MM" in 24h format
  close?: string; // "HH:MM" in 24h format
  closed?: boolean; // If true, location is closed this day
}

export interface SpecialDate {
  date: string; // "YYYY-MM-DD"
  open: string; // "HH:MM"
  close: string; // "HH:MM"
  closed: boolean; // If true, location is closed this day
}

export interface OpeningHours {
  regularHours: RegularHours[];
  specialDates?: SpecialDate[];
  permanentlyClosed?: boolean;
}

// Event timing structure
export type RecurrenceType = "none" | "daily" | "weekly" | "monthly" | "custom";

export interface Recurrence {
  type: RecurrenceType;
  interval: number; // e.g., 1 for every week, 2 for every other week
  daysOfWeek?: number[]; // 0-6 (Monday-Sunday)
  until: string; // "YYYY-MM-DD"
}

export interface EventTiming {
  startDateTime: string; // ISO format "YYYY-MM-DDTHH:MM:SS"
  endDateTime: string; // ISO format "YYYY-MM-DDTHH:MM:SS"
  recurrence?: Recurrence;
  timezone: string; // e.g., "Europe/Zurich"
}

/**
 * Checks if a location is open now based on its opening hours and the current date/time.
 * @param {OpeningHours} openingHours - The opening hours of the location
 * @param {Date} date - The date and time to check (default is the current date/time)
 * @returns {boolean} - Returns true if the location is open now, false otherwise
 */
export const isOpenNow = (
  openingHours: OpeningHours,
  date: Date = new Date()
): boolean => {
  const day = date.getDay();
  const time = date.toTimeString().slice(0, 5); // "HH:MM"

  // Check if the location is permanently closed
  if (openingHours.permanentlyClosed) {
    return false;
  }

  // Check regular hours
  const regularHours = openingHours.regularHours.filter(
    (hours) => hours.day === day
  );

  if (regularHours.length > 0) {
    // If there are multiple regular hours for the same day, check if any of them are open
    for (const hours of regularHours) {
      if (hours.closed) {
        return false;
      }
      if (hours.open && hours.close) {
        if (time >= hours.open && time <= hours.close) {
          // Only return true if the time is within the day's open hours,
          // otherwise hour might be included in another range for that day
          return true;
        }
      }
    }
  }

  // Check special dates
  if (openingHours.specialDates) {
    const specialDate = openingHours.specialDates.filter(
      (dateObj) => dateObj.date === date.toISOString().split("T")[0]
    );

    if (specialDate.length > 0) {
      // If there are multiple special dates for the same day, check if any of them are open
      for (const date of specialDate) {
        if (date.closed) {
          return false;
        }
        if (time >= date.open && time <= date.close) {
          // Only return true if the time is within the special date's open hours,
          // otherwise hour might be included in another range for that date
          return true;
        }
      }
    }
  }

  return false;
};
