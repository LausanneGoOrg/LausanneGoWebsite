/**
 * Data layer for activity related operations
 * @author Ugo Balducci
 * @version 1.0.0
 */

import { supabase } from "@/services/database";
import { OpeningHours } from "./utils/opening";
import { Address } from "./utils/address";
import { ContactInfo } from "./utils/contact";

/**
 * Class representing an activity
 */
class Activity {
  readonly activity_id: string;
  readonly business_id: string;
  readonly title: string;
  readonly description: string;
  readonly address: Address | null;
  readonly price: number;
  readonly open_hours: OpeningHours | null;
  readonly picture: string;
  readonly type: ActivityType | null;
  readonly contact: ContactInfo | null;

  static readonly queryKey = () => ["activities"];
  static readonly queryKeyById = (activity_id: string) => [
    "activities",
    { activity_id },
  ];

  constructor(
    activity_id: string,
    address: Address | null,
    business_id: string,
    description: string,
    open_hours: OpeningHours | null,
    price: number,
    title: string,
    picture: string,
    type: ActivityType | null,
    contact: ContactInfo | null = null
  ) {
    this.activity_id = activity_id;
    this.address = address;
    this.business_id = business_id;
    this.description = description;
    this.open_hours = open_hours;
    this.price = price;
    this.title = title;
    this.picture = picture;
    this.type = type;
    this.contact = contact;
  }

  /**
   * Updates the activity
   * @param {string} activity_id - The activity id of the activity
   * @param {string} address - The address of the activity
   * @param {string} business_id - The business id of the activity
   * @param {string} description - The description of the activity
   * @param {Openings} open_hours - The open hours of the activity
   * @param {number} price - The price of the activity
   * @param {string} title - The title of the activity
   * @param {string} picture - The picture of the activity
   * @param {ActivityType | null} type - The type of the activity
   * @returns {Activity} - The updated activity
   */
  update({
    activity_id,
    address,
    business_id,
    description,
    open_hours,
    price,
    title,
    picture,
    type,
    contact,
  }: {
    activity_id: string;
    address: Address | null;
    business_id: string;
    description: string;
    open_hours: OpeningHours | null;
    price: number;
    title: string;
    picture: string;
    type: ActivityType | null;
    contact: ContactInfo | null;
  }) {
    return new Activity(
      activity_id,
      address,
      business_id,
      description,
      open_hours,
      price,
      title,
      picture,
      type,
      contact
    );
  }

  /**
   * Clone the activity
   * @returns {Activity} - The cloned activity
   */
  clone() {
    return new Activity(
      this.activity_id,
      this.address,
      this.business_id,
      this.description,
      this.open_hours,
      this.price,
      this.title,
      this.picture,
      this.type,
      this.contact
    );
  }
}

// Activity types
export type ActivityPrimaryType =
  | "outdoor"
  | "sports"
  | "water"
  | "wellness"
  | "culture"
  | "family"
  | "sightseeing"
  | "gourmet"
  | "adventure";

export type OutdoorActivityType =
  | "hiking"
  | "biking"
  | "park_visit"
  | "garden"
  | "viewpoint"
  | "picnic"
  | "wildlife"
  | "other";

export type SportsActivityType =
  | "tennis"
  | "golf"
  | "swimming"
  | "climbing"
  | "fitness"
  | "winter_sports"
  | "team_sports"
  | "water_sports"
  | "other";

export type WaterActivityType =
  | "lake_cruise"
  | "swimming"
  | "paddleboarding"
  | "kayaking"
  | "sailing"
  | "fishing"
  | "beach"
  | "other";

export type WellnessActivityType =
  | "spa"
  | "massage"
  | "thermal_bath"
  | "yoga"
  | "meditation"
  | "fitness"
  | "other";

export type CultureActivityType =
  | "museum_visit"
  | "art_gallery"
  | "historical_site"
  | "architecture_tour"
  | "local_traditions"
  | "workshop"
  | "other";

export type FamilyActivityType =
  | "playground"
  | "zoo"
  | "aquarium"
  | "theme_park"
  | "family_trail"
  | "educational"
  | "other";

export type SightseeingActivityType =
  | "walking_tour"
  | "guided_tour"
  | "self_guided_tour"
  | "landmark"
  | "panorama"
  | "photography_spot"
  | "other";

export type GourmetActivityType =
  | "wine_tasting"
  | "chocolate_tasting"
  | "cheese_tasting"
  | "food_tour"
  | "cooking_class"
  | "market_visit"
  | "other";

export type AdventureActivityType =
  | "zipline"
  | "paragliding"
  | "rock_climbing"
  | "canyoning"
  | "via_ferrata"
  | "escape_game"
  | "other";

export type ActivitySecondaryType =
  | OutdoorActivityType
  | SportsActivityType
  | WaterActivityType
  | WellnessActivityType
  | CultureActivityType
  | FamilyActivityType
  | SightseeingActivityType
  | GourmetActivityType
  | AdventureActivityType;

export interface ActivityType {
  primary: ActivityPrimaryType;
  secondary: ActivitySecondaryType;
}

/**
 * Fetches an activity from the database
 * @param {string} activityId - The activity id of the activity
 * @returns {Activity} - The fetched activity
 * @throws {Error} - The error which occurred during the fetch
 */
const fetchActivity = async (activityId: string) => {
  const { data, error } = await supabase
    .from("Activity")
    .select("*")
    .eq("activity_id", activityId);

  if (error) throw new Error(error.message);

  const activity = data[0];

  return new Activity(
    activity.activity_id,
    activity.address,
    activity.business_id,
    activity.description,
    activity.open_hours,
    activity.price,
    activity.title,
    activity.picture,
    activity.type
  );
};

/**
 * Fetches activities from the database with pagination
 * @param {number} page - The page number (starting from 0)
 * @param {number} limit - The number of items per page
 * @returns {Activity[]} - The fetched activities
 * @throws {Error} - The error which occurred during the fetch
 */
const fetchActivities = async (page = 0, limit = 20) => {
  const { data, error } = await supabase
    .from("Activity")
    .select("*")
    .range(page * limit, (page + 1) * limit - 1);

  if (error) throw new Error(error.message);

  return data.map(
    (activity) =>
      new Activity(
        activity.activity_id,
        activity.address,
        activity.business_id,
        activity.description,
        activity.open_hours,
        activity.price,
        activity.title,
        activity.picture,
        activity.type
      )
  );
};

export default Activity;
export { fetchActivity, fetchActivities };
