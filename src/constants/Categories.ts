// Identifiants des catégories (ne pas traduire)
export enum CategoryId {
  // Catégories communes
  CULTURE = "culture",
  SPORT = "sport",
  GASTRONOMY = "gastronomy",

  // Catégories spécifiques aux activités
  NATURE = "nature",
  WELLNESS = "wellness",
  FAMILY = "family",
  ADVENTURE = "adventure",

  // Catégories spécifiques aux événements
  EDUCATION = "education",
  ENTERTAINMENT = "entertainment",
  SOCIAL = "social",
  BUSINESS = "business",

  // Catégories spécifiques aux entreprises
  FOOD = "food",
  DRINK = "drink",
  SHOPPING = "shopping",
  SERVICE = "service",
  OUTDOOR = "outdoor",
  NIGHTLIFE = "nightlife",
}

// Définition des catégories par type d'entité avec leurs identifiants
export const CategoryDefinitions = {
  activity: {
    ids: [
      CategoryId.CULTURE,
      CategoryId.NATURE,
      CategoryId.SPORT,
      CategoryId.WELLNESS,
      CategoryId.FAMILY,
      CategoryId.GASTRONOMY,
      CategoryId.ADVENTURE,
    ],
    defaultIds: [CategoryId.CULTURE, CategoryId.NATURE, CategoryId.SPORT],
  },
  event: {
    ids: [
      CategoryId.CULTURE,
      CategoryId.SPORT,
      CategoryId.EDUCATION,
      CategoryId.ENTERTAINMENT,
      CategoryId.SOCIAL,
      CategoryId.GASTRONOMY,
      CategoryId.BUSINESS,
    ],
    defaultIds: [
      CategoryId.CULTURE,
      CategoryId.ENTERTAINMENT,
      CategoryId.GASTRONOMY,
    ],
  },
  business: {
    ids: [
      CategoryId.FOOD,
      CategoryId.DRINK,
      CategoryId.CULTURE,
      CategoryId.SHOPPING,
      CategoryId.SERVICE,
      CategoryId.OUTDOOR,
      CategoryId.NIGHTLIFE,
    ],
    defaultIds: [CategoryId.FOOD, CategoryId.CULTURE, CategoryId.SHOPPING],
  },
};

// Types d'activités mappés vers les identifiants de catégories
export const mapActivityTypeToCategoryId = (
  type: { primary: string; secondary: string } | null
): CategoryId => {
  if (!type) return CategoryId.CULTURE; // Catégorie par défaut

  const mappings: Record<string, CategoryId> = {
    outdoor: CategoryId.NATURE,
    sports: CategoryId.SPORT,
    water: CategoryId.NATURE,
    wellness: CategoryId.WELLNESS,
    culture: CategoryId.CULTURE,
    family: CategoryId.FAMILY,
    sightseeing: CategoryId.CULTURE,
    gourmet: CategoryId.GASTRONOMY,
    adventure: CategoryId.ADVENTURE,
  };

  return mappings[type.primary] || CategoryId.CULTURE;
};

// Types d'événements mappés vers les identifiants de catégories
export const mapEventTypeToCategoryId = (
  type: { primary: string; secondary: string } | null
): CategoryId => {
  if (!type) return CategoryId.CULTURE; // Catégorie par défaut

  const mappings: Record<string, CategoryId> = {
    cultural: CategoryId.CULTURE,
    educational: CategoryId.EDUCATION,
    entertainment: CategoryId.ENTERTAINMENT,
    sports: CategoryId.SPORT,
    social: CategoryId.SOCIAL,
    business: CategoryId.BUSINESS,
  };

  // Cas spécial pour certains types secondaires liés à la nourriture
  if (type.secondary === "food" || type.secondary === "celebration") {
    return CategoryId.GASTRONOMY;
  }

  return mappings[type.primary] || CategoryId.CULTURE;
};

// Types d'entreprises mappés vers les identifiants de catégories
export const mapBusinessTypeToCategoryId = (
  type: { primary: string; secondary: string } | null
): CategoryId => {
  if (!type) return CategoryId.SERVICE; // Catégorie par défaut

  const mappings: Record<string, CategoryId> = {
    food: CategoryId.FOOD,
    drink: CategoryId.DRINK,
    culture: CategoryId.CULTURE,
    shopping: CategoryId.SHOPPING,
    service: CategoryId.SERVICE,
    outdoor: CategoryId.OUTDOOR,
    nightlife: CategoryId.NIGHTLIFE,
  };

  return mappings[type.primary] || CategoryId.SERVICE;
};

// Obtient tous les éléments d'un type spécifique qui correspondent à un identifiant de catégorie
export const filterByCategoryId = <
  T extends { type: { primary: string; secondary: string } | null }
>(
  items: T[],
  categoryId: CategoryId,
  entityType: "activity" | "event" | "business"
): T[] => {
  const mapFunction =
    entityType === "activity"
      ? mapActivityTypeToCategoryId
      : entityType === "event"
      ? mapEventTypeToCategoryId
      : mapBusinessTypeToCategoryId;

  return items.filter((item) => mapFunction(item.type) === categoryId);
};
