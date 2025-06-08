// Objective: Define the categories for the events and activities in the app.
import { I18n } from "@lingui/core";

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

// Fonction qui génère les noms traduits des catégories
export const getCategoryName = (i18n: I18n, categoryId: CategoryId): string => {
  switch (categoryId) {
    // Catégories communes
    case CategoryId.CULTURE:
      return i18n._("Culture");
    case CategoryId.SPORT:
      return i18n._("Sport");
    case CategoryId.GASTRONOMY:
      return i18n._("Gastronomy");

    // Catégories spécifiques aux activités
    case CategoryId.NATURE:
      return i18n._("Nature");
    case CategoryId.WELLNESS:
      return i18n._("Wellness");
    case CategoryId.FAMILY:
      return i18n._("Family");
    case CategoryId.ADVENTURE:
      return i18n._("Adventure");

    // Catégories spécifiques aux événements
    case CategoryId.EDUCATION:
      return i18n._("Education");
    case CategoryId.ENTERTAINMENT:
      return i18n._("Entertainment");
    case CategoryId.SOCIAL:
      return i18n._("Social");
    case CategoryId.BUSINESS:
      return i18n._("Business");

    // Catégories spécifiques aux entreprises
    case CategoryId.FOOD:
      return i18n._("Food");
    case CategoryId.DRINK:
      return i18n._("Drink");
    case CategoryId.SHOPPING:
      return i18n._("Shopping");
    case CategoryId.SERVICE:
      return i18n._("Service");
    case CategoryId.OUTDOOR:
      return i18n._("Outdoor");
    case CategoryId.NIGHTLIFE:
      return i18n._("Nightlife");

    default:
      return categoryId;
  }
};

// Traduction pour "All"
export const getTranslatedAll = (i18n: I18n): string => {
  return i18n._("All");
};

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

// Génère les listes de catégories avec noms traduits (pour l'interface utilisateur)
export const getCategoriesFilters = (i18n: I18n) => ({
  activity: {
    list: CategoryDefinitions.activity.ids.map((id) =>
      getCategoryName(i18n, id)
    ),
    default: CategoryDefinitions.activity.defaultIds.map((id) =>
      getCategoryName(i18n, id)
    ),
  },
  event: {
    list: CategoryDefinitions.event.ids.map((id) => getCategoryName(i18n, id)),
    default: CategoryDefinitions.event.defaultIds.map((id) =>
      getCategoryName(i18n, id)
    ),
  },
  business: {
    list: CategoryDefinitions.business.ids.map((id) =>
      getCategoryName(i18n, id)
    ),
    default: CategoryDefinitions.business.defaultIds.map((id) =>
      getCategoryName(i18n, id)
    ),
  },
});

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

// Fonctions de mappage qui retournent les noms traduits des catégories
export const mapActivityTypeToCategory = (
  i18n: I18n,
  type: { primary: string; secondary: string } | null
): string => {
  const categoryId = mapActivityTypeToCategoryId(type);
  return getCategoryName(i18n, categoryId);
};

export const mapEventTypeToCategory = (
  i18n: I18n,
  type: { primary: string; secondary: string } | null
): string => {
  const categoryId = mapEventTypeToCategoryId(type);
  return getCategoryName(i18n, categoryId);
};

export const mapBusinessTypeToCategory = (
  i18n: I18n,
  type: { primary: string; secondary: string } | null
): string => {
  const categoryId = mapBusinessTypeToCategoryId(type);
  return getCategoryName(i18n, categoryId);
};

// Obtient tous les éléments d'un type spécifique qui correspondent à une catégorie
export const filterByCategory = <
  T extends { type: { primary: string; secondary: string } | null }
>(
  i18n: I18n,
  items: T[],
  categoryName: string,
  entityType: "activity" | "event" | "business"
): T[] => {
  const mapFunction =
    entityType === "activity"
      ? (type: { primary: string; secondary: string } | null) =>
          mapActivityTypeToCategory(i18n, type)
      : entityType === "event"
      ? (type: { primary: string; secondary: string } | null) =>
          mapEventTypeToCategory(i18n, type)
      : (type: { primary: string; secondary: string } | null) =>
          mapBusinessTypeToCategory(i18n, type);

  return items.filter((item) => mapFunction(item.type) === categoryName);
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
