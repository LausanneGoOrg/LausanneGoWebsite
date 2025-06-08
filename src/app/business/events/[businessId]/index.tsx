"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEventsByBusiness } from "@/hooks/use-events";
import { useBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import { formatDateTime } from "@/utils/date";

function EventsListContent() {
  const router = useRouter();
  const params = useParams();
  const businessId = params.businessId as string;

  const { data: business } = useBusiness(businessId);
  const { data: events, isLoading } = useEventsByBusiness(businessId);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents =
    events?.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    );
  }

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
                Événements
                {business && (
                  <span className="text-lg font-normal text-gray-600">
                    {" "}
                    - {business.name}
                  </span>
                )}
              </h1>
            </div>
            <button
              onClick={() =>
                router.push(`/business/events/create?businessId=${businessId}`)
              }
              className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
            >
              Nouvel événement
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a1 1 0 012 0v4m0 0V3a1 1 0 012 0v4m0 0h4m-4 0h-4m4 0a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2h4z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Aucun événement
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Aucun événement ne correspond à votre recherche."
                : "Commencez par créer votre premier événement."}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <button
                  onClick={() =>
                    router.push(
                      `/business/events/create?businessId=${businessId}`
                    )
                  }
                  className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
                >
                  Créer un événement
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.event_id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                onClick={() =>
                  router.push(`/business/events/view/${event.event_id}`)
                }
              >
                {event.picture && (
                  <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                    <img
                      src={event.picture}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {event.title}
                    </h3>
                    {event.price > 0 && (
                      <span className="text-primary-red font-medium whitespace-nowrap ml-2">
                        {event.price} CHF
                      </span>
                    )}
                  </div>

                  {event.type && (
                    <div className="mb-2">
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {event.type.primary}
                      </span>
                    </div>
                  )}

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {event.open_hours && (
                    <div className="text-sm text-gray-500 mb-2">
                      <div className="flex items-center">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Début: {formatDateTime(event.open_hours.startDateTime)}
                      </div>
                      <div className="flex items-center mt-1">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Fin: {formatDateTime(event.open_hours.endDateTime)}
                      </div>
                    </div>
                  )}

                  {event.address && (
                    <div className="text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.address.city}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/business/events/edit/${event.event_id}`
                          );
                        }}
                        className="text-primary-red hover:text-primary-red-dark text-sm"
                      >
                        Modifier
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/business/events/view/${event.event_id}`
                          );
                        }}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        Voir détails
                      </button>
                    </div>
                    <div className="text-xs text-gray-400">
                      Priorité: {event.priority}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventsListClient() {
  return (
    <ProtectedRoute>
      <EventsListContent />
    </ProtectedRoute>
  );
}
