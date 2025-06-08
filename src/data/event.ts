/**
 * Data layer for event related operations
 * @author Ugo Balducci
 * @version 1.0.0
 */

import { supabase } from "@/services/database";
import { EventTiming } from "./utils/opening";
import { Address } from "./utils/address";

/**
 * Class representing an event
 */
class Event {
  readonly event_id: string;
  readonly business_id: string;
  readonly title: string;
  readonly description: string;
  readonly link: string;
  readonly address: Address | null;
  readonly priority: number;
  readonly open_hours: EventTiming | null;
  readonly price: number;
  readonly picture: string;
  readonly type: EventType | null;

  static readonly queryKey = () => ["events"];
  static readonly queryKeyById = (event_id: string) => ["events", { event_id }];

  constructor(
    event_id: string,
    address: Address | null,
    business_id: string,
    description: string,
    picture: string,
    open_hours: EventTiming | null,
    price: number,
    title: string,
    priority: number,
    link: string,
    type: EventType | null
  ) {
    this.event_id = event_id;
    this.address = address;
    this.business_id = business_id;
    this.description = description;
    this.picture = picture;
    this.open_hours = open_hours;
    this.priority = priority;
    this.price = price;
    this.link = link;
    this.title = title;
    this.type = type;
  }

  /**
   * Updates the event
   * @param {string} event_id - The event id of the event
   * @param {string} address - The address of the event
   * @param {string} business_id - The business id of the event
   * @param {string} description - The description of the event
   * @param {string} picture - The picture of the event
   * @param {Openings} open_hours - The open hours of the event
   * @param {number} price - The price of the event
   * @param {string} title - The title of the event
   * @param {string} link - The link of the event
   * @param {EventType | null} type - The type of the event
   * @returns {Event} - The updated event
   */
  update({
    event_id,
    address,
    business_id,
    description,
    picture,
    open_hours,
    price,
    title,
    priority,
    link,
    type,
  }: {
    event_id: string;
    address: Address | null;
    business_id: string;
    description: string;
    picture: string;
    open_hours: EventTiming | null;
    price: number;
    title: string;
    priority: number;
    link: string;
    type: EventType | null;
  }) {
    return new Event(
      event_id,
      address,
      business_id,
      description,
      picture,
      open_hours,
      price,
      title,
      priority,
      link,
      type
    );
  }

  /**
   * Clone the event
   * @returns {Event} - The cloned event
   */
  clone() {
    return new Event(
      this.event_id,
      this.address,
      this.business_id,
      this.description,
      this.picture,
      this.open_hours,
      this.price,
      this.title,
      this.priority,
      this.link,
      this.type
    );
  }
}

// Event & Activity types
export type EventPrimaryType =
  | "cultural"
  | "educational"
  | "entertainment"
  | "sports"
  | "social"
  | "business";

export type CulturalSecondaryType =
  | "exhibition"
  | "concert"
  | "festival"
  | "theater"
  | "dance"
  | "other";

export type EducationalSecondaryType =
  | "workshop"
  | "seminar"
  | "lecture"
  | "tour"
  | "other";

export type EntertainmentSecondaryType =
  | "performance"
  | "screening"
  | "game"
  | "other";

export type SportsSecondaryType =
  | "match"
  | "tournament"
  | "race"
  | "demonstration"
  | "other";

export type SocialSecondaryType =
  | "networking"
  | "party"
  | "meetup"
  | "celebration"
  | "other";

export type BusinessEventSecondaryType =
  | "conference"
  | "trade_show"
  | "opening"
  | "other";

export type EventSecondaryType =
  | CulturalSecondaryType
  | EducationalSecondaryType
  | EntertainmentSecondaryType
  | SportsSecondaryType
  | SocialSecondaryType
  | BusinessEventSecondaryType;

export interface EventType {
  primary: EventPrimaryType;
  secondary: EventSecondaryType;
}

/**
 * Fetches an event from the database
 * @param {string} eventId - The event id
 * @returns {Promise<Event>} - The event
 */
const fetchEvent = async (eventId: string) => {
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .eq("event_id", eventId);

  if (error) throw new Error(error.message);

  const event = data[0];

  return new Event(
    event.event_id,
    event.address,
    event.business_id,
    event.description,
    event.picture,
    event.open_hours,
    event.price,
    event.title,
    event.priority,
    event.link,
    event.type
  );
};

/**
 * Fetches events from the database with pagination
 * @param {number} page - The page number (starting from 0)
 * @param {number} limit - The number of items per page
 * @returns {Event[]} - The fetched events
 * @throws {Error} - The error which occurred during the fetch
 */
const fetchEvents = async (page = 0, limit = 20) => {
  const { data, error } = await supabase
    .from("Event")
    .select("*")
    .order("open_hours->startDateTime", { ascending: false })
    .range(page * limit, (page + 1) * limit - 1);

  if (error) throw new Error(error.message);

  return data.map(
    (event) =>
      new Event(
        event.event_id,
        event.address,
        event.business_id,
        event.description,
        event.picture,
        event.open_hours,
        event.price,
        event.title,
        event.priority,
        event.link,
        event.type
      )
  );
};

export default Event;
export { fetchEvent, fetchEvents };
