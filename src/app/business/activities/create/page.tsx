"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  ActivityType,
  ActivityPrimaryType,
  ActivitySecondaryType,
} from "@/data/activity";
import { Address } from "@/data/utils/address";
import { CategoryId, CategoryDefinitions } from "@/constants/Categories";

// Mapping des catégories vers les types d'activités
const CATEGORY_TO_ACTIVITY_TYPE: Record<CategoryId, ActivityPrimaryType> = {
  [CategoryId.CULTURE]: "culture",
  [CategoryId.NATURE]: "outdoor",
  [CategoryId.SPORT]: "sports",
  [CategoryId.WELLNESS]: "wellness",
  [CategoryId.FAMILY]: "family",
  [CategoryId.GASTRONOMY]: "gourmet",
  [CategoryId.ADVENTURE]: "adventure",
  // Fallback pour les autres catégories
  [CategoryId.EDUCATION]: "culture",
  [CategoryId.ENTERTAINMENT]: "culture",
  [CategoryId.SOCIAL]: "culture",
  [CategoryId.BUSINESS]: "culture",
  [CategoryId.FOOD]: "gourmet",
  [CategoryId.DRINK]: "gourmet",
  [CategoryId.SHOPPING]: "culture",
  [CategoryId.SERVICE]: "culture",
  [CategoryId.OUTDOOR]: "outdoor",
  [CategoryId.NIGHTLIFE]: "culture",
};

// Mapping inversé pour l'affichage
const ACTIVITY_TYPE_TO_CATEGORY_LABEL: Record<ActivityPrimaryType, string> = {
  culture: "Culturel",
  outdoor: "Plein air",
  sports: "Sport",
  wellness: "Bien-être",
  family: "Famille",
  gourmet: "Gastronomie",
  adventure: "Aventure",
  sightseeing: "Visite touristique",
  water: "Activités aquatiques",
};

const ACTIVITY_SECONDARY_TYPES: Record<
  ActivityPrimaryType,
  { value: string; label: string }[]
> = {
  culture: [
    { value: "museum_visit", label: "Visite de musée" },
    { value: "art_gallery", label: "Galerie d'art" },
    { value: "historical_site", label: "Site historique" },
    { value: "architecture_tour", label: "Tour architectural" },
    { value: "local_traditions", label: "Traditions locales" },
    { value: "workshop", label: "Atelier" },
    { value: "other", label: "Autre" },
  ],
  outdoor: [
    { value: "hiking", label: "Randonnée" },
    { value: "biking", label: "Vélo" },
    { value: "park_visit", label: "Visite de parc" },
    { value: "garden", label: "Jardin" },
    { value: "viewpoint", label: "Point de vue" },
    { value: "picnic", label: "Pique-nique" },
    { value: "wildlife", label: "Faune sauvage" },
    { value: "other", label: "Autre" },
  ],
  sports: [
    { value: "tennis", label: "Tennis" },
    { value: "golf", label: "Golf" },
    { value: "swimming", label: "Natation" },
    { value: "climbing", label: "Escalade" },
    { value: "fitness", label: "Fitness" },
    { value: "winter_sports", label: "Sports d'hiver" },
    { value: "team_sports", label: "Sports d'équipe" },
    { value: "water_sports", label: "Sports nautiques" },
    { value: "other", label: "Autre" },
  ],
  wellness: [
    { value: "spa", label: "Spa" },
    { value: "massage", label: "Massage" },
    { value: "thermal_bath", label: "Bains thermaux" },
    { value: "yoga", label: "Yoga" },
    { value: "meditation", label: "Méditation" },
    { value: "fitness", label: "Fitness" },
    { value: "other", label: "Autre" },
  ],
  family: [
    { value: "playground", label: "Aire de jeux" },
    { value: "zoo", label: "Zoo" },
    { value: "aquarium", label: "Aquarium" },
    { value: "theme_park", label: "Parc à thème" },
    { value: "family_trail", label: "Sentier familial" },
    { value: "educational", label: "Éducatif" },
    { value: "other", label: "Autre" },
  ],
  gourmet: [
    { value: "wine_tasting", label: "Dégustation de vin" },
    { value: "chocolate_tasting", label: "Dégustation de chocolat" },
    { value: "cheese_tasting", label: "Dégustation de fromage" },
    { value: "food_tour", label: "Tour gastronomique" },
    { value: "cooking_class", label: "Cours de cuisine" },
    { value: "market_visit", label: "Visite de marché" },
    { value: "other", label: "Autre" },
  ],
  adventure: [
    { value: "zipline", label: "Tyrolienne" },
    { value: "paragliding", label: "Parapente" },
    { value: "rock_climbing", label: "Escalade" },
    { value: "canyoning", label: "Canyoning" },
    { value: "via_ferrata", label: "Via ferrata" },
    { value: "escape_game", label: "Escape game" },
    { value: "other", label: "Autre" },
  ],
  sightseeing: [
    { value: "walking_tour", label: "Tour à pied" },
    { value: "guided_tour", label: "Tour guidé" },
    { value: "self_guided_tour", label: "Tour auto-guidé" },
    { value: "landmark", label: "Monument" },
    { value: "panorama", label: "Panorama" },
    { value: "photography_spot", label: "Spot photo" },
    { value: "other", label: "Autre" },
  ],
  water: [
    { value: "lake_cruise", label: "Croisière sur lac" },
    { value: "swimming", label: "Natation" },
    { value: "paddleboarding", label: "Paddle" },
    { value: "kayaking", label: "Kayak" },
    { value: "sailing", label: "Voile" },
    { value: "fishing", label: "Pêche" },
    { value: "beach", label: "Plage" },
    { value: "other", label: "Autre" },
  ],
};

// Générer la liste des types primaires basée sur les catégories d'activité
const ACTIVITY_PRIMARY_TYPES = CategoryDefinitions.activity.ids
  .map((categoryId) => ({
    value: CATEGORY_TO_ACTIVITY_TYPE[categoryId],
    label:
      ACTIVITY_TYPE_TO_CATEGORY_LABEL[CATEGORY_TO_ACTIVITY_TYPE[categoryId]],
  }))
  .filter(
    (item, index, self) =>
      // Supprimer les doublons
      self.findIndex((t) => t.value === item.value) === index
  );

function CreateActivityContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");
  const { data: business } = useUserBusiness(businessId || "");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    link: "",
    priority: 1,
    picture: "",
    primaryType: "" as ActivityPrimaryType,
    secondaryType: "",
    // Address fields
    streetNumber: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Suisse",
    latitude: 0,
    longitude: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [useBusinessAddress, setUseBusinessAddress] = useState(true);

  // Initialize with business address if available
  useEffect(() => {
    if (business?.address && useBusinessAddress) {
      setFormData((prev) => ({
        ...prev,
        street: business.address?.street || "",
        city: business.address?.city || "",
        postalCode: business.address?.postalCode || "",
        country: business.address?.country || "Suisse",
        latitude: business.address?.coord.lat || 0,
        longitude: business.address?.coord.lng || 0,
      }));
    }
  }, [business, useBusinessAddress]);

  if (!businessId) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">ID d'entreprise manquant</div>
        <button
          onClick={() => router.push("/business/dashboard")}
          className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
        >
          Retour au dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const address: Address = {
        streetNumber: formData.streetNumber,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        coord: {
          lat: formData.latitude,
          lng: formData.longitude,
        },
      };

      const activityType: ActivityType = {
        primary: formData.primaryType,
        secondary: formData.secondaryType as ActivitySecondaryType,
      };

      // TODO: Implement API call to create activity
      // const newActivity = await createActivity({
      //   business_id: businessId,
      //   title: formData.title,
      //   description: formData.description,
      //   price: formData.price,
      //   link: formData.link,
      //   priority: formData.priority,
      //   picture: formData.picture,
      //   address,
      //   type: activityType,
      // });

      console.log("Creating activity:", {
        business_id: businessId,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        link: formData.link,
        priority: formData.priority,
        picture: formData.picture,
        address,
        type: activityType,
      });

      router.push(`/business/view/${businessId}`);
    } catch (error) {
      console.error("Erreur lors de la création de l'activité:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const secondaryTypes = formData.primaryType
    ? ACTIVITY_SECONDARY_TYPES[formData.primaryType]
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <button
                onClick={() => router.push(`/business/view/${businessId}`)}
                className="text-primary-red hover:text-primary-red-dark mb-2 flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Retour à l'entreprise
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Créer une nouvelle activité
                {business && (
                  <span className="text-lg font-normal text-gray-600">
                    {" "}
                    - {business.name}
                  </span>
                )}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Informations générales
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'activité *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Ex: Visite du musée d'art"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (CHF)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="0.00"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="Décrivez votre activité en détail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lien externe
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="https://votre-site.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de l'image
              </label>
              <input
                type="url"
                value={formData.picture}
                onChange={(e) =>
                  setFormData({ ...formData, picture: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="https://exemple.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priorité
                <span className="text-xs text-gray-500 ml-1">
                  (1-10, 10 = priorité maximale)
                </span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            {/* Activity Type */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                Type d'activité
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type principal *
              </label>
              <select
                required
                value={formData.primaryType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    primaryType: e.target.value as ActivityPrimaryType,
                    secondaryType: "",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              >
                <option value="">Sélectionner un type</option>
                {ACTIVITY_PRIMARY_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type secondaire
              </label>
              <select
                value={formData.secondaryType}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                disabled={!formData.primaryType}
              >
                <option value="">Sélectionner un sous-type</option>
                {secondaryTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                Adresse de l'activité
              </h3>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useBusinessAddress}
                    onChange={(e) => setUseBusinessAddress(e.target.checked)}
                    className="mr-2"
                  />
                  Utiliser l'adresse de l'entreprise
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rue *
              </label>
              <input
                type="number"
                required
                value={formData.streetNumber}
                onChange={(e) =>
                  setFormData({ ...formData, streetNumber: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
                placeholder="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rue *
              </label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
                placeholder="Rue de la Paix"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
                placeholder="Lausanne"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code postal *
              </label>
              <input
                type="text"
                required
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
                placeholder="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays *
              </label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.push(`/business/view/${businessId}`)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-red text-white rounded-md hover:bg-primary-red-dark disabled:opacity-50"
            >
              {isLoading ? "Création..." : "Créer l'activité"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateActivityPage() {
  return (
    <ProtectedRoute>
      <CreateActivityContent />
    </ProtectedRoute>
  );
}
