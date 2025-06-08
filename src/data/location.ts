/**
 * Data layer for location related operations
 * @author Ugo Balducci
 * @version 1.0.0
 */

import { supabase } from "@/services/database";

/**
 * Class representing a Location
 */
class Location {
  readonly location_id: string;
  readonly description: string;
  readonly name: string;
  readonly order: number;
  readonly picture: string;
  readonly points: number;
  readonly address: string;
  readonly metro: string;
  readonly teaser: string;

  readonly coordinates: {
    longitude: number;
    latitude: number;
  };

  static NUM_LOCATIONS = 31;

  static readonly queryKey = () => ["locations"];
  static readonly queryKeyById = (locationId: string) => [
    "locations",
    { locationId },
  ];
  static readonly queryKeyByUser = (userId: string) => [
    "locations",
    { userId },
  ];

  constructor(
    location_id: string,
    description: string,
    name: string,
    order: number,
    picture: string,
    points: number,
    address: string,
    metro: string,
    teaser: string
  ) {
    this.location_id = location_id;
    this.description = description;
    this.name = name;
    this.order = order;
    this.picture = picture;
    this.points = points;
    this.address = address;
    this.metro = metro;
    this.teaser = teaser;

    const coordinates = address.split(",");
    this.coordinates = {
      longitude: parseFloat(coordinates[1]),
      latitude: parseFloat(coordinates[0]),
    };
  }

  /**
   * Updates the location
   */
  update({
    location_id,
    description,
    name,
    order,
    picture,
    points,
    address,
    metro,
    teaser,
  }: {
    location_id?: string;
    description?: string;
    name?: string;
    order?: number;
    picture?: string;
    points?: number;
    address?: string;
    metro?: string;
    teaser?: string;
  }) {
    return new Location(
      location_id ?? this.location_id,
      description ?? this.description,
      name ?? this.name,
      order ?? this.order,
      picture ?? this.picture,
      points ?? this.points,
      address ?? this.address,
      metro ?? this.metro,
      teaser ?? this.teaser
    );
  }

  /**
   * Clone the Location
   */
  clone() {
    return new Location(
      this.location_id,
      this.description,
      this.name,
      this.order,
      this.picture,
      this.points,
      this.address,
      this.metro,
      this.teaser
    );
  }
}

const fromJson = (location: any) => {
  return new Location(
    location.location_id,
    location.description,
    location.name,
    location.order,
    location.picture,
    location.points,
    location.address,
    location.metro,
    location.teaser
  );
};

/**
 * Fetches a location from the database
 */
const fetchLocation = async (locationId: string): Promise<Location> => {
  const { data, error } = await supabase
    .from("Location")
    .select(
      `
        location_id,
        description,
        name,
        order,
        address,
        picture,
        points,
        metro,
        teaser
      `
    )
    .eq("location_id", locationId);

  if (error) throw new Error(error.message);

  const location = data[0];

  return new Location(
    location.location_id,
    location.description,
    location.name,
    location.order,
    location.picture,
    location.points,
    location.address,
    location.metro,
    location.teaser
  );
};

const fetchLocationName = async (Name: string): Promise<Location> => {
  const { data, error } = await supabase
    .from("Location")
    .select(
      `
        location_id,
        description,
        name,
        order,
        address,
        picture,
        points,
        metro,
        teaser
      `
    )
    .eq("name", Name);

  if (error) throw new Error(error.message);

  const location = data[0];

  return new Location(
    location.location_id,
    location.description,
    location.name,
    location.order,
    location.picture,
    location.points,
    location.address,
    location.metro,
    location.teaser
  );
};

/**
 * Fetches the names of all locations from the database and returns them as a comma-separated string.
 */
const fetchAllLocationNamesAsString = async (): Promise<string> => {
  const { data, error } = await supabase.from("Location").select("name");

  if (error) throw new Error(error.message);

  const names = data.map((location: { name: string }) => location.name);
  return names.join(", ");
};

/**
 * Fetches all locations from the database
 */
const fetchAllLocations = async (): Promise<Location[]> => {
  const { data, error } = await supabase.from("Location").select(
    `
        location_id,
        description,
        name,
        order,
        address,
        picture,
        points,
        metro,
        teaser
      `
  );

  if (error) throw new Error(error.message);

  // On mappe les résultats à la classe Location
  return data.map((location: any) => {
    return new Location(
      location.location_id,
      location.description,
      location.name,
      location.order,
      location.picture,
      location.points,
      location.address,
      location.metro,
      location.teaser
    );
  });
};

const fetchVisitedLocations = async (userId: string): Promise<Location[]> => {
  console.log("Fetching visited locations for user: ", userId);
  const { data, error } = await supabase
    .from("Visited")
    .select(
      `
        location:Location (
          location_id,
          description,
          name,
          order,
          address,
          picture,
          points,
          metro,
          teaser
        )
      `
    )
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  const locations = data.map((visited) => {
    return new Location(
      // @ts-ignore
      visited.location.location_id,
      // @ts-ignore
      visited.location.description,
      // @ts-ignore
      visited.location.name,
      // @ts-ignore
      visited.location.order,
      // @ts-ignore
      visited.location.picture,
      // @ts-ignore
      visited.location.points,
      // @ts-ignore
      visited.location.address,
      // @ts-ignore
      visited.location.metro,
      // @ts-ignore
      visited.location.teaser
    );
  });
  return locations;
};

const setLocationVisited = async (
  userId: string,
  locationId: string,
  picture: string
): Promise<void> => {
  const { error } = await supabase.from("Visited").insert([
    {
      user_id: userId,
      location_id: locationId,
      time_of_visit: new Date().toUTCString(),
      picture: picture,
    },
  ]);

  if (error) throw new Error(error.message);
};

export default Location;
export {
  fetchLocation,
  fetchLocationName,
  fetchAllLocationNamesAsString,
  fromJson,
  fetchAllLocations,
  fetchVisitedLocations,
  setLocationVisited,
};
