import { I18n } from "@lingui/core";

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

/**
 * Formats opening hours as human-readable text strings.
 * @param {I18n} i18n - The i18n instance for translations
 * @param {OpeningHours} openingHours - The opening hours of the location
 * @param {Date} date - The date and time to check if open now (default is the current date/time)
 * @returns {string[]} - Array of formatted strings, one for each day of the week and current status
 */
export const formatOpeningHours = (
  i18n: I18n,
  openingHours: OpeningHours,
  date: Date = new Date()
): string[] => {
  if (openingHours.permanentlyClosed) {
    return [i18n._("Permanently closed")];
  }

  const isOpen = isOpenNow(openingHours, date);
  const dayNames = [
    i18n._("Monday"),
    i18n._("Tuesday"),
    i18n._("Wednesday"),
    i18n._("Thursday"),
    i18n._("Friday"),
    i18n._("Saturday"),
    i18n._("Sunday"),
  ];
  const formattedHours: string[] = [];

  // Add current status
  formattedHours.push(
    isOpen ? i18n._("Currently open") : i18n._("Currently closed")
  );

  // Process regular hours for each day of the week
  for (let i = 0; i < 7; i++) {
    const dayHours = openingHours.regularHours.filter(
      (hours) => hours.day === i
    );

    if (dayHours.length === 0) {
      formattedHours.push(`${dayNames[i]}: ${i18n._("Closed")}`);
      continue;
    }

    const hoursTexts: string[] = [];

    for (const hours of dayHours) {
      if (hours.closed) {
        hoursTexts.push(i18n._("Closed"));
      } else if (hours.open && hours.close) {
        hoursTexts.push(`${hours.open} - ${hours.close}`);
      }
    }

    formattedHours.push(`${dayNames[i]}: ${hoursTexts.join(", ")}`);
  }

  // Add special dates if any
  if (openingHours.specialDates && openingHours.specialDates.length > 0) {
    for (const special of openingHours.specialDates) {
      const specialDate = new Date(special.date);
      const formattedDate = specialDate.toLocaleDateString(i18n.locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      if (special.closed) {
        formattedHours.push(
          `${formattedDate}: ${i18n._("Exceptionally closed")}`
        );
      } else {
        formattedHours.push(
          `${formattedDate}: ${special.open} - ${special.close} (${i18n._(
            "Special hours"
          )})`
        );
      }
    }
  }

  return formattedHours;
};

/**
 * Formats event timing information as human-readable text.
 * @param {I18n} i18n - The i18n instance for translations
 * @param {EventTiming} eventTiming - The event timing information
 * @returns {string[]} - Array of formatted strings describing the event schedule
 */
export const formatEventTiming = (
  i18n: I18n,
  eventTiming: EventTiming
): string[] => {
  const result: string[] = [];

  // Parse dates
  const startDate = new Date(eventTiming.startDateTime);
  const endDate = new Date(eventTiming.endDateTime);

  // Format the base event period
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const startDateStr = startDate.toLocaleDateString(i18n.locale, dateOptions);
  const endDateStr = endDate.toLocaleDateString(i18n.locale, dateOptions);
  const startTimeStr = startDate.toLocaleTimeString(i18n.locale, timeOptions);
  const endTimeStr = endDate.toLocaleTimeString(i18n.locale, timeOptions);

  // Handle single day vs multi-day events
  if (startDateStr === endDateStr) {
    result.push(`${startDateStr}, ${startTimeStr} - ${endTimeStr}`);
  } else {
    result.push(
      i18n._("From {startDate}, {startTime} to {endDate}, {endTime}", {
        startDate: startDateStr,
        startTime: startTimeStr,
        endDate: endDateStr,
        endTime: endTimeStr,
      })
    );
  }

  // Handle recurrence patterns
  if (eventTiming.recurrence) {
    const { type, interval, daysOfWeek, until } = eventTiming.recurrence;
    const untilDate = new Date(until);
    const untilStr = untilDate.toLocaleDateString(i18n.locale, dateOptions);

    let recurrenceText = "";
    switch (type) {
      case "daily":
        recurrenceText =
          interval === 1
            ? i18n._("Every day")
            : i18n._("Every {interval} days", { interval });
        break;

      case "weekly":
        recurrenceText =
          interval === 1
            ? i18n._("Every week")
            : i18n._("Every {interval} weeks", { interval });

        if (daysOfWeek && daysOfWeek.length > 0) {
          const dayNames = [
            i18n._("Monday"),
            i18n._("Tuesday"),
            i18n._("Wednesday"),
            i18n._("Thursday"),
            i18n._("Friday"),
            i18n._("Saturday"),
            i18n._("Sunday"),
          ].map((day) => day.toLowerCase());

          const daysText = daysOfWeek.map((d) => dayNames[d]).join(", ");
          recurrenceText += ` (${daysText})`;
        }
        break;

      case "monthly":
        recurrenceText =
          interval === 1
            ? i18n._("Every month")
            : i18n._("Every {interval} months", { interval });
        break;

      case "custom":
        recurrenceText = i18n._("Custom recurrence");
        break;
    }

    if (recurrenceText) {
      result.push(
        i18n._("{recurrence} until {date}", {
          recurrence: recurrenceText,
          date: untilStr,
        })
      );
    }
  }

  // Check if event is currently active
  const now = new Date();
  const isActive = now >= startDate && now <= endDate;
  result.push(
    isActive ? i18n._("Event in progress") : i18n._("Upcoming event")
  );

  return result;
};
