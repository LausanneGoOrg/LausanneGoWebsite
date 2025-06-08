export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  coord: Coordinates;
  street: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

export const formatAddress = (address: Address | null): string => {
  if (!address) return "Address unavailable";

  const street = address.street || "";
  const streetNumber = address.streetNumber || "";
  const streetPart = street
    ? `${streetNumber} ${street}`.trim()
    : "Multiple Locations";

  const city = address.city || "";
  const postalCode = address.postalCode || "";
  const cityPart = [postalCode, city].filter(Boolean).join(" ");

  return cityPart ? `${streetPart}, ${cityPart}` : streetPart;
};
