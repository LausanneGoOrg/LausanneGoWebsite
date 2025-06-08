"use client";

import { useParams, useRouter } from "next/navigation";
import { useEvent } from "@/hooks/use-events";
import { useUserBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";
import { formatDateTime } from "@/utils/date";

function EventViewContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const { data: event, isLoading, error } = useEvent(eventId);
  const { data: business } = useUserBusiness(event?.business_id || "");

  if (isLoading) {
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
          Retour
        </button>
      </div>
    );
  }

  const isEventPast =
    event.open_hours && new Date(event.open_hours.endDateTime) < new Date();
  const isEventToday =
    event.open_hours &&
    new Date(event.open_hours.startDateTime).toDateString() ===
      new Date().toDateString();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <button
                onClick={() => router.back()}
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
                Retour
              </button>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h1>
                {isEventPast && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    Terminé
                  </span>
                )}
                {isEventToday && !isEventPast && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Aujourd'hui
                  </span>
                )}
              </div>
              {business && (
                <p className="text-sm text-gray-600">
                  Organisé par {business.name}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/business/events/edit/${eventId}`)}
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
            {event.picture ? (
              <Image
                src={event.picture}
                alt={event.title}
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
              {/* Event Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Informations de l'événement
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Titre</dt>
                    <dd className="text-sm text-gray-900">{event.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="text-sm text-gray-900 whitespace-pre-wrap">
                      {event.description}
                    </dd>
                  </div>
                  {event.price > 0 && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Prix
                      </dt>
                      <dd className="text-sm text-gray-900 font-medium text-green-600">
                        {event.price} CHF
                      </dd>
                    </div>
                  )}
                  {event.link && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Lien externe
                      </dt>
                      <dd className="text-sm">
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Voir plus d'informations
                        </a>
                      </dd>
                    </div>
                  )}
                  {event.type && (
                    <>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Type principal
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {event.type.primary}
                        </dd>
                      </div>
                      {event.type.secondary && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Type secondaire
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {event.type.secondary}
                          </dd>
                        </div>
                      )}
                    </>
                  )}
                </dl>
              </div>

              {/* Date & Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Date et lieu
                </h3>
                <div className="space-y-6">
                  {/* Date et heure */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📅 Date et heure
                    </h3>
                    {event.open_hours ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">
                          <span className="font-medium">Début :</span>{" "}
                          {formatDateTime(event.open_hours.startDateTime)}
                        </p>
                        <p className="text-gray-700 mt-1">
                          <span className="font-medium">Fin :</span>{" "}
                          {formatDateTime(event.open_hours.endDateTime)}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">Dates non spécifiées</p>
                    )}
                  </div>

                  {/* Adresse */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📍 Lieu
                    </h3>
                    {event.address ? (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700">{event.address.street}</p>
                        <p className="text-gray-700">
                          {event.address.postalCode} {event.address.city}
                        </p>
                        <p className="text-gray-700">{event.address.country}</p>
                        {event.address.coord && (
                          <p className="text-sm text-gray-500 mt-2">
                            Coordonnées : {event.address.coord.lat.toFixed(6)},{" "}
                            {event.address.coord.lng.toFixed(6)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">Adresse non spécifiée</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Duration and Status */}
            {event.open_hours && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-md font-medium text-gray-800 mb-2">
                  Informations temporelles
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Durée:</span>
                    <span className="ml-2 text-gray-900">
                      {Math.ceil(
                        (new Date(event.open_hours.endDateTime).getTime() -
                          new Date(event.open_hours.startDateTime).getTime()) /
                          (1000 * 60 * 60)
                      )}{" "}
                      heures
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Statut:</span>
                    <span
                      className={`ml-2 font-medium ${
                        isEventPast
                          ? "text-gray-600"
                          : isEventToday
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {isEventPast
                        ? "Terminé"
                        : isEventToday
                        ? "Aujourd'hui"
                        : "À venir"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Priorité:</span>
                    <span className="ml-2 text-gray-900">{event.priority}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventViewPage() {
  return (
    <ProtectedRoute>
      <EventViewContent />
    </ProtectedRoute>
  );
}
