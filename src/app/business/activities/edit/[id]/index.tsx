"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useActivityById } from "@/hooks/use-activities";
import { useUserBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import Activity, {
  ActivityType,
  ActivityPrimaryType,
  ActivitySecondaryType,
} from "@/data/activity";
import { Address } from "@/data/utils/address";
import { OpeningHours, RegularHours } from "@/data/utils/opening";

const ACTIVITY_PRIMARY_TYPES: { value: ActivityPrimaryType; label: string }[] =
  [
    { value: "outdoor", label: "Plein air" },
    { value: "sports", label: "Sport" },
    { value: "water", label: "Activités aquatiques" },
    { value: "wellness", label: "Bien-être" },
    { value: "culture", label: "Culture" },
    { value: "family", label: "Famille" },
    { value: "sightseeing", label: "Tourisme" },
    { value: "gourmet", label: "Gastronomie" },
    { value: "adventure", label: "Aventure" },
  ];

const ACTIVITY_SECONDARY_TYPES: Record<
  ActivityPrimaryType,
  { value: string; label: string }[]
> = {
  outdoor: [
    { value: "hiking", label: "Randonnée" },
    { value: "biking", label: "Vélo" },
    { value: "park_visit", label: "Visite de parc" },
    { value: "garden", label: "Jardin" },
    { value: "viewpoint", label: "Point de vue" },
    { value: "picnic", label: "Pique-nique" },
    { value: "wildlife", label: "Observation de la faune" },
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
  water: [
    { value: "lake_cruise", label: "Croisière sur le lac" },
    { value: "swimming", label: "Natation" },
    { value: "paddleboarding", label: "Paddle" },
    { value: "kayaking", label: "Kayak" },
    { value: "sailing", label: "Voile" },
    { value: "fishing", label: "Pêche" },
    { value: "beach", label: "Plage" },
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
  culture: [
    { value: "museum_visit", label: "Visite de musée" },
    { value: "art_gallery", label: "Galerie d'art" },
    { value: "historical_site", label: "Site historique" },
    { value: "architecture_tour", label: "Visite architecturale" },
    { value: "local_traditions", label: "Traditions locales" },
    { value: "workshop", label: "Atelier" },
    { value: "other", label: "Autre" },
  ],
  family: [
    { value: "playground", label: "Aire de jeux" },
    { value: "zoo", label: "Zoo" },
    { value: "aquarium", label: "Aquarium" },
    { value: "theme_park", label: "Parc d'attractions" },
    { value: "family_trail", label: "Sentier familial" },
    { value: "educational", label: "Éducatif" },
    { value: "other", label: "Autre" },
  ],
  sightseeing: [
    { value: "walking_tour", label: "Visite à pied" },
    { value: "guided_tour", label: "Visite guidée" },
    { value: "self_guided_tour", label: "Visite libre" },
    { value: "landmark", label: "Monument" },
    { value: "panorama", label: "Panorama" },
    { value: "photography_spot", label: "Spot photo" },
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
    { value: "rock_climbing", label: "Escalade en rocher" },
    { value: "canyoning", label: "Canyoning" },
    { value: "via_ferrata", label: "Via ferrata" },
    { value: "escape_game", label: "Escape game" },
    { value: "other", label: "Autre" },
  ],
};

interface FormData {
  title: string;
  description: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  price: number | null;
  picture: string;
  primaryType: ActivityPrimaryType | "";
  secondaryType: ActivitySecondaryType | "";
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  openingHours: RegularHours[];
}

function EditActivityContent() {
  const params = useParams();
  const router = useRouter();
  const activityId = params.id as string;
  const { activity, isLoading: activityLoading } = useActivityById(activityId);
  const { data: business } = useUserBusiness(activity?.business_id || "");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: null,
    primaryType: "outdoor" as ActivityPrimaryType,
    secondaryType: "hiking" as ActivitySecondaryType,
    picture: "",
    street: "",
    streetNumber: "",
    city: "",
    postalCode: "",
    country: "",
    latitude: null,
    longitude: null,
    contact: {
      email: "",
      phone: "",
      website: "",
    },
    openingHours: [],
  });

  const [loading, setLoading] = useState(false);

  // Load activity data into form
  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title,
        description: activity.description,
        price: activity.price,
        primaryType: activity.type?.primary || "outdoor",
        secondaryType: activity.type?.secondary || "hiking",
        picture: activity.picture,
        street: activity.address?.street || "",
        streetNumber: activity.address?.streetNumber || "",
        postalCode: activity.address?.postalCode || "",
        city: activity.address?.city || "",
        country: activity.address?.country || "",
        latitude: activity.address?.coord?.lat || null,
        longitude: activity.address?.coord?.lng || null,
        contact: {
          email: activity.contact?.email || "",
          phone: activity.contact?.phone || "",
          website: activity.contact?.website || "",
        },
        openingHours: activity.open_hours?.regularHours || [],
      });
    } else if (business) {
      // Pre-fill with business address if activity not loaded yet
      setFormData((prev) => ({
        ...prev,
        street: business.address?.street || "",
        streetNumber: business.address?.streetNumber || "",
        postalCode: business.address?.postalCode || "",
        city: business.address?.city || "",
        country: business.address?.country || "",
        latitude: business.address?.coord?.lat || null,
        longitude: business.address?.coord?.lng || null,
      }));
    }
  }, [activity, business]);

  if (activityLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          Activité non trouvée ou erreur de chargement
        </div>
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
    setLoading(true);

    try {
      const address: Address = {
        streetNumber: formData.streetNumber,
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        coord: {
          lat: formData.latitude || 0,
          lng: formData.longitude || 0,
        },
      };

      const activityType: ActivityType = {
        primary: formData.primaryType as ActivityPrimaryType,
        secondary: formData.secondaryType as ActivitySecondaryType,
      };

      // TODO: Implement API call to update activity
      console.log("Updated activity data:", {
        activityId,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        primaryType: formData.primaryType,
        secondaryType: formData.secondaryType,
        picture: formData.picture,
        address,
        type: activityType,
      });

      router.push(`/business/activities/view/${activityId}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'activité:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir supprimer cette activité ? Cette action est irréversible."
      )
    ) {
      return;
    }

    try {
      // TODO: Implement API call to delete activity
      console.log("Deleting activity:", activityId);
      router.push(`/business/view/${activity.business_id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'activité:", error);
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
                onClick={() =>
                  router.push(`/business/activities/view/${activityId}`)
                }
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
                Retour à l'activité
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Modifier l'activité
                {business && (
                  <span className="text-lg font-normal text-gray-600">
                    {" "}
                    - {business.name}
                  </span>
                )}
              </h1>
            </div>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Supprimer
            </button>
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
                value={formData.price || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || null,
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type principal
              </label>
              <select
                value={formData.primaryType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    primaryType: e.target.value as ActivityPrimaryType,
                    secondaryType: "" as ActivitySecondaryType,
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
                  setFormData({
                    ...formData,
                    secondaryType: e.target.value as ActivitySecondaryType,
                  })
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de rue
              </label>
              <input
                type="text"
                value={formData.streetNumber}
                onChange={(e) =>
                  setFormData({ ...formData, streetNumber: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                value={formData.latitude || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    latitude: parseFloat(e.target.value) || null,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                value={formData.longitude || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    longitude: parseFloat(e.target.value) || null,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            {/* Contact Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                Informations de contact
              </h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, phone: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, email: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site web
              </label>
              <input
                type="url"
                value={formData.contact.website}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, website: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
                placeholder="https://..."
              />
            </div>

            {/* Opening Hours */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 mt-6">
                Horaires d'ouverture
              </h3>
            </div>

            {[0, 1, 2, 3, 4, 5, 6].map((dayNum) => (
              <div key={dayNum} className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">
                  {
                    [
                      "Dimanche",
                      "Lundi",
                      "Mardi",
                      "Mercredi",
                      "Jeudi",
                      "Vendredi",
                      "Samedi",
                    ][dayNum]
                  }
                </span>
                <input
                  type="time"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    formData.openingHours.find((h) => h.day === dayNum)?.open ||
                    ""
                  }
                  onChange={(e) => {
                    const existingHour = formData.openingHours.find(
                      (h) => h.day === dayNum
                    );
                    if (existingHour) {
                      setFormData({
                        ...formData,
                        openingHours: formData.openingHours.map((h) =>
                          h.day === dayNum ? { ...h, open: e.target.value } : h
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        openingHours: [
                          ...formData.openingHours,
                          { day: dayNum, open: e.target.value, close: "" },
                        ],
                      });
                    }
                  }}
                />
                <input
                  type="time"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={
                    formData.openingHours.find((h) => h.day === dayNum)
                      ?.close || ""
                  }
                  onChange={(e) => {
                    const existingHour = formData.openingHours.find(
                      (h) => h.day === dayNum
                    );
                    if (existingHour) {
                      setFormData({
                        ...formData,
                        openingHours: formData.openingHours.map((h) =>
                          h.day === dayNum ? { ...h, close: e.target.value } : h
                        ),
                      });
                    } else {
                      setFormData({
                        ...formData,
                        openingHours: [
                          ...formData.openingHours,
                          { day: dayNum, open: "", close: e.target.value },
                        ],
                      });
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() =>
                router.push(`/business/activities/view/${activityId}`)
              }
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-red text-white rounded-md hover:bg-primary-red-dark disabled:opacity-50"
            >
              {loading ? "Mise à jour..." : "Sauvegarder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditActivityClient() {
  return (
    <ProtectedRoute>
      <EditActivityContent />
    </ProtectedRoute>
  );
}
