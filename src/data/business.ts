/**
 * Data layer for business related operations
 * @author Ugo Balducci
 * @version 1.0.0
 */

import { supabase } from "@/services/database";
import { Address } from "./utils/address";
import { OpeningHours } from "./utils/opening";

/**
 * Class representing a business
 */
class Business {
  readonly business_id: string;
  readonly name: string;
  readonly address: Address | null;
  readonly open_hours: OpeningHours | null;
  readonly picture: string;
  readonly type: BusinessType | null;

  static readonly queryKey = () => ["business"];
  static readonly queryKeyById = (business_id: string) => [
    "business",
    { business_id },
  ];

  constructor(
    address: Address | null,
    business_id: string,
    name: string,
    open_hours: OpeningHours | null,
    picture: string,
    type: BusinessType | null
  ) {
    this.address = address;
    this.business_id = business_id;
    this.name = name;
    this.open_hours = open_hours;
    this.picture = picture;
    this.type = type;
  }

  /**
   * Updates the business
   * @param {string} address - The address of the business
   * @param {string} business_id - The business id
   * @param {string} name - The name of the business
   * @param {OpeningHours} open_hours - The open hours of the business
   * @param {string} picture - The picture of the business
   * @param {BusinessType} type - The type of the business
   * @returns {Business} - The updated business
   */
  update({
    address,
    business_id,
    name,
    open_hours,
    picture,
    type,
  }: {
    address?: Address;
    business_id?: string;
    name?: string;
    open_hours?: OpeningHours | null;
    picture?: string;
    type?: BusinessType | null;
  }) {
    return new Business(
      address ?? this.address,
      business_id ?? this.business_id,
      name ?? this.name,
      open_hours ?? this.open_hours,
      picture ?? this.picture,
      type ?? this.type
    );
  }

  /**
   * Clone the business
   * @returns {Business} - The cloned business
   */
  clone() {
    return new Business(
      this.address,
      this.business_id,
      this.name,
      this.open_hours,
      this.picture,
      this.type
    );
  }
}

// Business types
export type BusinessPrimaryType =
  | "food"
  | "drink"
  | "culture"
  | "shopping"
  | "service"
  | "outdoor"
  | "nightlife";

export type FoodSecondaryType =
  | "fine_dining"
  | "casual"
  | "fast_food"
  | "cafe"
  | "bakery"
  | "swiss"
  | "italian"
  | "asian"
  | "other";

export type DrinkSecondaryType =
  | "bar"
  | "pub"
  | "wine_bar"
  | "brewery"
  | "coffee_shop"
  | "tea_house"
  | "other";

export type CultureSecondaryType =
  | "museum"
  | "gallery"
  | "theater"
  | "cinema"
  | "library"
  | "historical_site"
  | "other";

export type ShoppingSecondaryType =
  | "boutique"
  | "mall"
  | "grocery"
  | "bookstore"
  | "market"
  | "other";

export type NightlifeSecondaryType =
  | "club"
  | "live_music"
  | "lounge"
  | "jazz_club"
  | "other";

export type OutdoorSecondaryType =
  | "park"
  | "beach"
  | "hiking"
  | "sports_facility"
  | "other";

export type ServiceSecondaryType =
  | "salon"
  | "spa"
  | "fitness"
  | "banking"
  | "post"
  | "other";

export type BusinessSecondaryType =
  | FoodSecondaryType
  | DrinkSecondaryType
  | CultureSecondaryType
  | ShoppingSecondaryType
  | NightlifeSecondaryType
  | OutdoorSecondaryType
  | ServiceSecondaryType;

export interface BusinessType {
  primary: BusinessPrimaryType;
  secondary: BusinessSecondaryType;
}

/**
 * Fetches a business from the database
 * @param {string} businessId - The id of the business
 * @returns {Promise<Business>} - The business
 */
const fetchBusiness = async (businessId: string) => {
  const { data, error } = await supabase
    .from("Business")
    .select(
      `
        address,
        business_id,
        name,
        open_hours,
        picture,
        business_type
  `
    )
    .eq("business_id", businessId);

  if (error) throw new Error(error.message);

  const business = data[0];

  return new Business(
    business.address,
    business.business_id,
    business.name,
    business.open_hours,
    business.picture,
    business.business_type
  );
};

/**
 * Fetches businesses from the database that match the given type
 * @param {BusinessPrimaryType[]} types - The types of the businesses
 * @returns {Promise<Business[]>} - The fetched businesses
 * @throws {Error} - The error which occurred during the fetch
 */
const fetchBusinessesByType = async (
  types: BusinessPrimaryType[]
): Promise<Business[]> => {
  const { data, error } = await supabase
    .from("Business")
    .select(
      `
        address,
        business_id,
        name,
        open_hours,
        picture,
        business_type
  `
    )
    .filter(
      "business_type->>primary",
      "in",
      `(${types.map((type) => `"${type}"`).join(",")})`
    );

  if (error) throw new Error(error.message);
  return data.map(
    (business) =>
      new Business(
        business.address,
        business.business_id,
        business.name,
        business.open_hours,
        business.picture,
        business.business_type
      )
  );
};

/**
 * Fetches businesses from the database that match the given type
 * @param {string} businessOwner - The owner of the businesses
 * @returns {Promise<Business[]>} - The fetched businesses
 * @throws {Error} - The error which occurred during the fetch
 */
const fetchBusinessesByOwner = async (
  businessOwner: string,
  isAdmin: boolean = false
): Promise<Business[]> => {
  let query = supabase.from("Business").select(
    `
        address,
        business_id,
        name,
        open_hours,
        picture,
        business_type
  `
  );

  // If not admin, filter by owner
  if (!isAdmin) {
    query = query.eq("business_owner", businessOwner);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data.map(
    (business) =>
      new Business(
        business.address,
        business.business_id,
        business.name,
        business.open_hours,
        business.picture,
        business.business_type
      )
  );
};

export default Business;
export { fetchBusiness, fetchBusinessesByType, fetchBusinessesByOwner };
