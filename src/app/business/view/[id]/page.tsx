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
  const { data: events, isLoading: eventsLoading } = useEvents();
  const { data: activities, isLoading: activitiesLoading } = useActivities();

  // Filter events and activities for this business
  const businessEvents =
    events
      ?.filter((event) => event.business_id === businessId)
      ?.sort(
        (a, b) =>
          new Date(a.open_hours.startDateTime) -
          new Date(b.open_hours.startDateTime)
      ) || [];
  const businessActivities =
    activities
      ?.filter((activity) => activity.business_id === businessId)
      ?.sort((a, b) => a.title.localeCompare(b.title)) || [];

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

  const formatTime = (time: string | undefined) => {
    if (!time) return "";
    return time;
  };

  const isCurrentlyOpen = business?.open_hours
    ? isOpenNow(business.open_hours)
    : false;

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
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {business.name}
                </h1>
                {business.open_hours && (
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      business.open_hours.permanentlyClosed
                        ? "bg-gray-100 text-gray-800"
                        : isCurrentlyOpen
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {business.open_hours.permanentlyClosed
                      ? "Fermé définitivement"
                      : isCurrentlyOpen
                      ? "Ouvert"
                      : "Fermé"}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/business/edit/${businessId}`)}
                className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
              >
                Modifier
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
              {/* Basic Info */}
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
                </dl>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Adresse
                </h3>
                {business.address ? (
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Rue</dt>
                      <dd className="text-sm text-gray-900">
                        {business.address.street}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Ville
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {business.address.postalCode} {business.address.city}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Pays
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {business.address.country}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="text-sm text-gray-500">
                    Aucune adresse renseignée
                  </p>
                )}
              </div>
            </div>

            {/* Opening Hours */}
            {business.open_hours && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Horaires d'ouverture
                </h3>

                {business.open_hours.permanentlyClosed ? (
                  <div className="p-4 bg-gray-100 rounded-lg text-center">
                    <span className="text-gray-600 font-medium">
                      Fermé définitivement
                    </span>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Regular Hours */}
                    <div>
                      <h4 className="text-md font-medium text-gray-800 mb-3">
                        Horaires réguliers
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {DAY_NAMES.map((dayName, dayIndex) => {
                          const dayHours =
                            business.open_hours?.regularHours.find(
                              (h) => h.day === dayIndex
                            );
                          const today = new Date().getDay();
                          const isToday = dayIndex === today;

                          return (
                            <div
                              key={dayIndex}
                              className={`flex justify-between items-center p-3 rounded-lg ${
                                isToday
                                  ? "bg-blue-50 border border-blue-200"
                                  : "bg-gray-50"
                              }`}
                            >
                              <span
                                className={`text-sm font-medium ${
                                  isToday ? "text-blue-700" : "text-gray-700"
                                }`}
                              >
                                {dayName}
                                {isToday && (
                                  <span className="ml-1 text-xs">
                                    (Aujourd'hui)
                                  </span>
                                )}
                              </span>
                              <span className="text-sm text-gray-900">
                                {dayHours?.closed ||
                                !dayHours?.open ||
                                !dayHours?.close
                                  ? "Fermé"
                                  : `${formatTime(
                                      dayHours.open
                                    )} - ${formatTime(dayHours.close)}`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Special Dates */}
                    {business.open_hours.specialDates &&
                      business.open_hours.specialDates.length > 0 && (
                        <div>
                          <h4 className="text-md font-medium text-gray-800 mb-3">
                            Dates spéciales
                          </h4>
                          <div className="space-y-2">
                            {business.open_hours.specialDates
                              .sort(
                                (a, b) =>
                                  new Date(a.date).getTime() -
                                  new Date(b.date).getTime()
                              )
                              .map((specialDate, index) => {
                                const date = new Date(specialDate.date);
                                const isToday =
                                  date.toDateString() ===
                                  new Date().toDateString();
                                const isPast = date < new Date() && !isToday;

                                return (
                                  <div
                                    key={index}
                                    className={`flex justify-between items-center p-3 rounded-lg border ${
                                      isToday
                                        ? "bg-yellow-50 border-yellow-200"
                                        : isPast
                                        ? "bg-gray-50 border-gray-200 opacity-60"
                                        : "bg-yellow-50 border-yellow-200"
                                    }`}
                                  >
                                    <div className="flex flex-col">
                                      <span
                                        className={`text-sm font-medium ${
                                          isToday
                                            ? "text-yellow-800"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {date.toLocaleDateString("fr-FR", {
                                          weekday: "long",
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                        {isToday && (
                                          <span className="ml-1 text-xs">
                                            (Aujourd'hui)
                                          </span>
                                        )}
                                      </span>
                                      {isPast && (
                                        <span className="text-xs text-gray-500">
                                          Passé
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-sm text-gray-900">
                                      {specialDate.closed
                                        ? "Fermé"
                                        : `${formatTime(
                                            specialDate.open
                                          )} - ${formatTime(
                                            specialDate.close
                                          )}`}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Events Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Événements ({businessEvents.length})
                </h3>
                <button
                  onClick={() =>
                    router.push(
                      `/business/events/create?businessId=${businessId}`
                    )
                  }
                  className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark text-sm"
                >
                  Créer un événement
                </button>
              </div>

              {eventsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red"></div>
                </div>
              ) : businessEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessEvents.map((event) => (
                    <div
                      key={event.event_id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">
                          {event.title}
                        </h4>
                        <div className="flex gap-1">
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
                          <span className="text-gray-300">|</span>
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
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      {event.open_hours && (
                        <p className="text-xs text-gray-500">
                          {new Date(
                            event.open_hours.startDateTime
                          ).toLocaleDateString("fr-FR")}
                        </p>
                      )}
                      {event.price > 0 && (
                        <p className="text-sm font-medium text-green-600">
                          {event.price} CHF
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun événement créé pour cet établissement</p>
                  <button
                    onClick={() =>
                      router.push(
                        `/business/events/create?businessId=${businessId}`
                      )
                    }
                    className="mt-2 text-primary-red hover:text-primary-red-dark"
                  >
                    Créer le premier événement
                  </button>
                </div>
              )}
            </div>

            {/* Activities Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Activités ({businessActivities.length})
                </h3>
                <button
                  onClick={() =>
                    router.push(
                      `/business/activities/create?businessId=${businessId}`
                    )
                  }
                  className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark text-sm"
                >
                  Créer une activité
                </button>
              </div>

              {activitiesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-red"></div>
                </div>
              ) : businessActivities.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessActivities.map((activity) => (
                    <div
                      key={activity.activity_id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">
                          {activity.title}
                        </h4>
                        <div className="flex gap-1">
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
                          <span className="text-gray-300">|</span>
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
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {activity.description}
                      </p>
                      {activity.type && (
                        <p className="text-xs text-gray-500 mb-1">
                          {activity.type.primary} - {activity.type.secondary}
                        </p>
                      )}
                      {activity.price > 0 && (
                        <p className="text-sm font-medium text-green-600">
                          {activity.price} CHF
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Aucune activité créée pour cet établissement</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessViewPage() {
  return (
    <ProtectedRoute>
      <BusinessViewContent />
    </ProtectedRoute>
  );
}
