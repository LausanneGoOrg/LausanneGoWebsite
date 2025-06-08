"use client";

import { useParams, useRouter } from "next/navigation";
import { useUserBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import { isOpenNow } from "@/data/utils/opening";
import { useEvents } from "@/hooks/use-events";
import { useActivities } from "@/hooks/use-activities";

const DAY_NAMES = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

function BusinessViewContent() {
  const params = useParams();
  const router = useRouter();
  const businessId = params.id as string;
  const { data: business, isLoading, error } = useUserBusiness(businessId);
  const { events } = useEvents();
  const { activities } = useActivities();

  // Filter events and activities for this business
  const businessEvents =
    events?.filter((event) => event.business_id === businessId) || [];
  const businessActivities =
    activities?.filter((activity) => activity.business_id === businessId) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          Établissement non trouvé ou erreur de chargement
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

  const currentlyOpen = business.open_hours
    ? isOpenNow(business.open_hours)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <button
                onClick={() => router.push("/business/dashboard")}
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
                Retour au dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                {business.name}
              </h1>
              {business.type && (
                <p className="text-sm text-gray-600">
                  {business.type.primary} - {business.type.secondary}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/business/edit/${businessId}`)}
                className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
              >
                Modifier
              </button>
              <button
                onClick={() => router.push(`/business/events/${businessId}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Voir les événements
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Image */}
          <div className="relative h-64 bg-gray-200">
            {business.picture ? (
              <Image
                src={business.picture}
                alt={business.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">Aucune image</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Business Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Informations générales
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nom</dt>
                    <dd className="text-sm text-gray-900">{business.name}</dd>
                  </div>
                  {business.type && (
                    <>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Type principal
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {business.type.primary}
                        </dd>
                      </div>
                      {business.type.secondary && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Type secondaire
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {business.type.secondary}
                          </dd>
                        </div>
                      )}
                    </>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Statut
                    </dt>
                    <dd className="text-sm">
                      {currentlyOpen === null ? (
                        <span className="text-gray-500">
                          Horaires non définis
                        </span>
                      ) : currentlyOpen ? (
                        <span className="text-green-600 font-medium">
                          Ouvert
                        </span>
                      ) : (
                        <span className="text-red-600 font-medium">Fermé</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Address & Hours */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Adresse et horaires
                </h3>
                <div className="space-y-6">
                  {/* Address */}
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-2">
                      📍 Adresse
                    </h4>
                    {business.address ? (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-gray-700">
                          {business.address.street}
                        </p>
                        <p className="text-gray-700">
                          {business.address.postalCode} {business.address.city}
                        </p>
                        <p className="text-gray-700">
                          {business.address.country}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Adresse non renseignée</p>
                    )}
                  </div>

                  {/* Hours */}
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-2">
                      🕒 Horaires d'ouverture
                    </h4>
                    {business.open_hours?.permanentlyClosed ? (
                      <p className="text-red-600 font-medium">
                        Fermé définitivement
                      </p>
                    ) : business.open_hours?.regularHours ? (
                      <div className="space-y-1">
                        {business.open_hours.regularHours.map(
                          (dayHours, index) => (
                            <div
                              key={index}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-600">
                                {DAY_NAMES[dayHours.day]}
                              </span>
                              <span className="text-gray-900">
                                {dayHours.closed
                                  ? "Fermé"
                                  : `${dayHours.open} - ${dayHours.close}`}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">Horaires non définis</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Activities Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Activités</h3>
                <button
                  onClick={() =>
                    router.push(
                      `/business/activities/create?businessId=${businessId}`
                    )
                  }
                  className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
                >
                  Ajouter une activité
                </button>
              </div>

              {businessActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {businessActivities.map((activity) => (
                    <div
                      key={activity.activity_id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {activity.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {activity.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-primary-red font-medium">
                          {activity.price > 0
                            ? `${activity.price} CHF`
                            : "Gratuit"}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              router.push(
                                `/business/activities/edit/${activity.activity_id}`
                              )
                            }
                            className="text-primary-red hover:text-primary-red-dark text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() =>
                              router.push(
                                `/business/activities/view/${activity.activity_id}`
                              )
                            }
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Voir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">Aucune activité pour le moment</p>
                  <button
                    onClick={() =>
                      router.push(
                        `/business/activities/create?businessId=${businessId}`
                      )
                    }
                    className="mt-2 text-primary-red hover:text-primary-red-dark"
                  >
                    Créer la première activité
                  </button>
                </div>
              )}
            </div>

            {/* Events Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Événements
                </h3>
                <button
                  onClick={() =>
                    router.push(
                      `/business/events/create?businessId=${businessId}`
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Ajouter un événement
                </button>
              </div>

              {businessEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {businessEvents.slice(0, 6).map((event) => (
                    <div
                      key={event.event_id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {event.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-medium">
                          {event.price > 0 ? `${event.price} CHF` : "Gratuit"}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              router.push(
                                `/business/events/edit/${event.event_id}`
                              )
                            }
                            className="text-primary-red hover:text-primary-red-dark text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() =>
                              router.push(
                                `/business/events/view/${event.event_id}`
                              )
                            }
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Voir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="mb-2">Aucun événement pour le moment</p>
                  <button
                    onClick={() =>
                      router.push(
                        `/business/events/create?businessId=${businessId}`
                      )
                    }
                    className="mt-2 text-blue-600 hover:text-blue-800"
                  >
                    Créer le premier événement
                  </button>
                </div>
              )}

              {businessEvents.length > 6 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() =>
                      router.push(`/business/events/${businessId}`)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Voir tous les événements ({businessEvents.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessViewClient() {
  return (
    <ProtectedRoute>
      <BusinessViewContent />
    </ProtectedRoute>
  );
}
