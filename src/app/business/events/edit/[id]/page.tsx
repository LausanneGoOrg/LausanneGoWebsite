"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEvent } from "@/hooks/use-events";
import { useUserBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import { EventType, EventPrimaryType, EventSecondaryType } from "@/data/event";
import { Address } from "@/data/utils/address";
import { EventTiming } from "@/data/utils/opening";

const EVENT_PRIMARY_TYPES: { value: EventPrimaryType; label: string }[] = [
  { value: "cultural", label: "Culturel" },
  { value: "educational", label: "Éducatif" },
  { value: "entertainment", label: "Divertissement" },
  { value: "sports", label: "Sport" },
  { value: "social", label: "Social" },
  { value: "business", label: "Business" },
];

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

function EditEventContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const { data: event, isLoading: eventLoading, error } = useEvent(eventId);
  const { data: business } = useUserBusiness(event?.business_id || "");

  const [formData, setFormData] = useState({
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
  const [useBusinessAddress, setUseBusinessAddress] = useState(false);

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

  // Load event data into form
  useEffect(() => {
    if (event) {
      const formatDateForInput = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      };

      setFormData({
        title: event.title,
        description: event.description,
        price: event.price,
        link: event.link,
        priority: event.priority,
        picture: event.picture,
        startDateTime: event.open_hours
          ? formatDateForInput(event.open_hours.startDateTime)
          : "",
        endDateTime: event.open_hours
          ? formatDateForInput(event.open_hours.endDateTime)
          : "",
        primaryType: event.type?.primary || ("" as EventPrimaryType),
        secondaryType: event.type?.secondary || "",
        street: event.address?.street || "",
        city: event.address?.city || "",
        postalCode: event.address?.postalCode || "",
        country: event.address?.country || "Suisse",
        latitude: event.address?.coord?.lat || 0,
        longitude: event.address?.coord?.lng || 0,
      });

      // Check if event address matches business address
      if (business?.address && event.address) {
        const addressMatches =
          business.address.street === event.address.street &&
          business.address.city === event.address.city &&
          business.address.postalCode === event.address.postalCode;
        setUseBusinessAddress(addressMatches);
      }
    }
  }, [event, business]);

  if (eventLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          Événement non trouvé ou erreur de chargement
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

      // TODO: Implement API call to update event
      // const updatedEvent = await updateEvent(eventId, {
      //   title: formData.title,
      //   description: formData.description,
      //   price: formData.price,
      //   link: formData.link,
      //   priority: formData.priority,
      //   picture: formData.picture,
      //   address,
      //   open_hours: eventTiming,
      //   type: eventType,
      // });

      console.log("Updated event data:", {
        eventId,
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

      router.push(`/business/events/view/${eventId}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'événement:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible."
      )
    ) {
      return;
    }

    try {
      // TODO: Implement API call to delete event
      // await deleteEvent(eventId);
      console.log("Deleting event:", eventId);
      router.push(`/business/view/${event.business_id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement:", error);
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
                onClick={() => router.push(`/business/events/view/${eventId}`)}
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
                Retour à l'événement
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Modifier l'événement
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
              onClick={() => router.push(`/business/events/view/${eventId}`)}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-red text-white rounded-md hover:bg-primary-red-dark disabled:opacity-50"
            >
              {isLoading ? "Mise à jour..." : "Sauvegarder"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditEventPage() {
  return (
    <ProtectedRoute>
      <EditEventContent />
    </ProtectedRoute>
  );
}
