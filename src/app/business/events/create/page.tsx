"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserBusiness, useUserBusinesses } from "@/hooks/use-business";
import { useCreateEvent } from "@/hooks/use-events";
import ProtectedRoute from "@/components/ProtectedRoute";
import { EventType, EventPrimaryType, EventSecondaryType } from "@/data/event";
import { Address } from "@/data/utils/address";
import { EventTiming } from "@/data/utils/opening";
import { CategoryId, CategoryDefinitions } from "@/constants/Categories";

// Mapping des catégories vers les types d'événements
const CATEGORY_TO_EVENT_TYPE: Record<CategoryId, EventPrimaryType> = {
  [CategoryId.CULTURE]: "cultural",
  [CategoryId.SPORT]: "sports",
  [CategoryId.EDUCATION]: "educational",
  [CategoryId.ENTERTAINMENT]: "entertainment",
  [CategoryId.SOCIAL]: "social",
  [CategoryId.GASTRONOMY]: "social", // Les événements gastronomiques sont souvent sociaux
  [CategoryId.BUSINESS]: "business",
  // Fallback pour les autres catégories
  [CategoryId.NATURE]: "cultural",
  [CategoryId.WELLNESS]: "cultural",
  [CategoryId.FAMILY]: "entertainment",
  [CategoryId.ADVENTURE]: "entertainment",
  [CategoryId.FOOD]: "social",
  [CategoryId.DRINK]: "social",
  [CategoryId.SHOPPING]: "business",
  [CategoryId.SERVICE]: "business",
  [CategoryId.OUTDOOR]: "entertainment",
  [CategoryId.NIGHTLIFE]: "entertainment",
};

// Mapping inversé pour l'affichage
const EVENT_TYPE_TO_CATEGORY_LABEL: Record<EventPrimaryType, string> = {
  cultural: "Culturel",
  educational: "Éducatif",
  entertainment: "Divertissement",
  sports: "Sport",
  social: "Social",
  business: "Business",
};

const EVENT_SECONDARY_TYPES: Record<
  EventPrimaryType,
  { value: string; label: string }[]
> = {
  cultural: [
    { value: "exhibition", label: "Exposition" },
    { value: "concert", label: "Concert" },
    { value: "festival", label: "Festival" },
    { value: "theater", label: "Théâtre" },
    { value: "dance", label: "Danse" },
    { value: "other", label: "Autre" },
  ],
  educational: [
    { value: "workshop", label: "Atelier" },
    { value: "seminar", label: "Séminaire" },
    { value: "lecture", label: "Conférence" },
    { value: "tour", label: "Visite guidée" },
    { value: "other", label: "Autre" },
  ],
  entertainment: [
    { value: "performance", label: "Spectacle" },
    { value: "screening", label: "Projection" },
    { value: "game", label: "Jeu" },
    { value: "other", label: "Autre" },
  ],
  sports: [
    { value: "match", label: "Match" },
    { value: "tournament", label: "Tournoi" },
    { value: "race", label: "Course" },
    { value: "demonstration", label: "Démonstration" },
    { value: "other", label: "Autre" },
  ],
  social: [
    { value: "networking", label: "Networking" },
    { value: "party", label: "Fête" },
    { value: "meetup", label: "Rencontre" },
    { value: "celebration", label: "Célébration" },
    { value: "other", label: "Autre" },
  ],
  business: [
    { value: "conference", label: "Conférence" },
    { value: "trade_show", label: "Salon professionnel" },
    { value: "opening", label: "Ouverture" },
    { value: "other", label: "Autre" },
  ],
};

// Générer la liste des types primaires basée sur les catégories d'événement
const EVENT_PRIMARY_TYPES = CategoryDefinitions.event.ids
  .map((categoryId) => ({
    value: CATEGORY_TO_EVENT_TYPE[categoryId],
    label: EVENT_TYPE_TO_CATEGORY_LABEL[CATEGORY_TO_EVENT_TYPE[categoryId]],
  }))
  .filter(
    (item, index, self) =>
      // Supprimer les doublons
      self.findIndex((t) => t.value === item.value) === index
  );

function CreateEventContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const businessId = searchParams.get("businessId");
  const { data: business } = useUserBusiness(businessId || "");
  const {businesses = []} = useUserBusinesses();

  const [formData, setFormData] = useState({
    businessId: "",
    title: "",
    description: "",
    price: 0,
    link: "",
    priority: 1,
    picture: "",
    startDateTime: "",
    endDateTime: "",
    primaryType: "" as EventPrimaryType,
    secondaryType: "",
    // Address fields
    street: "",
    city: "",
    postalCode: "",
    country: "Suisse",
    latitude: 0,
    longitude: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [useBusinessAddress, setUseBusinessAddress] = useState(true);

  // Update address when using business address
  useEffect(() => {
    if (business?.address && useBusinessAddress) {
      setFormData((prev) => ({
        ...prev,
        street: business.address?.street || "",
        city: business.address?.city || "",
        postalCode: business.address?.postalCode || "",
        country: business.address?.country || "Suisse",
        latitude: business.address?.coord?.lat || 0,
        longitude: business.address?.coord?.lng || 0,
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
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        streetNumber: "", // Add required field
        coord: {
          lat: formData.latitude,
          lng: formData.longitude,
        },
      };

      const eventTiming: EventTiming = {
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
        timezone: "Europe/Zurich", // Add required timezone
      };

      const eventType: EventType = {
        primary: formData.primaryType,
        secondary: formData.secondaryType as EventSecondaryType,
      };

      // TODO: Implement API call to create event
      

      console.log("Event data:", {
        business_id: businessId,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        link: formData.link,
        priority: formData.priority,
        picture: formData.picture,
        address,
        open_hours: eventTiming,
        type: eventType,
      });

      router.push(`/business/view/${businessId}`);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const secondaryTypes = formData.primaryType
    ? EVENT_SECONDARY_TYPES[formData.primaryType]
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
                Créer un événement
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
                Business*
              </label>
              <select
                value={formData.businessId}
                onChange={(e) =>
                  setFormData({ ...formData, businessId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
              >
                <option value="">Sélectionner un business</option>
                {businesses.map((business) => (
                  <option key={business.name} value={business.business_id}>
                    {business.business_id}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de l'événement *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
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
                placeholder="https://..."
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
                placeholder="https://..."
              />
            </div>

            {/* Date and Time */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                Horaires
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date et heure de début *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.startDateTime}
                onChange={(e) =>
                  setFormData({ ...formData, startDateTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date et heure de fin *
              </label>
              <input
                type="datetime-local"
                required
                value={formData.endDateTime}
                onChange={(e) =>
                  setFormData({ ...formData, endDateTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            {/* Event Type */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                Type d'événement
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type principal
              </label>
              <select
                value={formData.primaryType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    primaryType: e.target.value as EventPrimaryType,
                    secondaryType: "",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              >
                <option value="">Sélectionner un type</option>
                {EVENT_PRIMARY_TYPES.map((type) => (
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
                Adresse de l'événement
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
                Rue
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ville
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code postal
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                disabled={useBusinessAddress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays
              </label>
              <input
                type="text"
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
              {isLoading ? "Création..." : "Créer l'événement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <CreateEventContent />
    </ProtectedRoute>
  );
}
