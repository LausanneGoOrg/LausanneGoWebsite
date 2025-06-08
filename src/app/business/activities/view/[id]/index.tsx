"use client";

import { useParams, useRouter } from "next/navigation";
import { useActivityById } from "@/hooks/use-activities";
import { useUserBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import Image from "next/image";

function ActivityViewContent() {
  const params = useParams();
  const router = useRouter();
  const activityId = params.id as string;
  const { activity, isLoading, error } = useActivityById(activityId);
  const { data: business } = useUserBusiness(activity?.business_id || "");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (error || !activity) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          Activité non trouvée ou erreur de chargement
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
                  {activity.title}
                </h1>
              </div>
              {business && (
                <p className="text-sm text-gray-600">
                  Proposé par {business.name}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  router.push(`/business/activities/edit/${activityId}`)
                }
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
            {activity.picture ? (
              <Image
                src={activity.picture}
                alt={activity.title}
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
              {/* Activity Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Informations de l'activité
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Titre</dt>
                    <dd className="text-sm text-gray-900">{activity.title}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="text-sm text-gray-900 whitespace-pre-wrap">
                      {activity.description}
                    </dd>
                  </div>
                  {activity.price > 0 && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Prix
                      </dt>
                      <dd className="text-sm text-gray-900 font-medium text-green-600">
                        {activity.price} CHF
                      </dd>
                    </div>
                  )}
                  {activity.type && (
                    <>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Type principal
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {activity.type.primary}
                        </dd>
                      </div>
                      {activity.type.secondary && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Type secondaire
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {activity.type.secondary}
                          </dd>
                        </div>
                      )}
                    </>
                  )}
                </dl>
              </div>

              {/* Address & Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Localisation et contact
                </h3>
                <div className="space-y-6">
                  {/* Adresse */}
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-2">
                      📍 Adresse
                    </h4>
                    {activity.address ? (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-gray-700">
                          {activity.address.streetNumber}{" "}
                          {activity.address.street}
                        </p>
                        <p className="text-gray-700">
                          {activity.address.postalCode} {activity.address.city}
                        </p>
                        <p className="text-gray-700">
                          {activity.address.country}
                        </p>
                        {activity.address.coord && (
                          <p className="text-sm text-gray-500 mt-2">
                            Coordonnées :{" "}
                            {activity.address.coord.lat.toFixed(6)},{" "}
                            {activity.address.coord.lng.toFixed(6)}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">Adresse non spécifiée</p>
                    )}
                  </div>

                  {/* Contact */}
                  {activity.contact && (
                    <div>
                      <h4 className="text-md font-medium text-gray-800 mb-2">
                        📞 Contact
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-md space-y-2">
                        {activity.contact.phone && (
                          <p className="text-gray-700">
                            <span className="font-medium">Téléphone :</span>{" "}
                            <a
                              href={`tel:${activity.contact.phone}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {activity.contact.phone}
                            </a>
                          </p>
                        )}
                        {activity.contact.email && (
                          <p className="text-gray-700">
                            <span className="font-medium">Email :</span>{" "}
                            <a
                              href={`mailto:${activity.contact.email}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {activity.contact.email}
                            </a>
                          </p>
                        )}
                        {activity.contact.website && (
                          <p className="text-gray-700">
                            <span className="font-medium">Site web :</span>{" "}
                            <a
                              href={activity.contact.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Visiter le site
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            {activity.open_hours?.regularHours &&
              activity.open_hours.regularHours.length > 0 && (
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-md font-medium text-gray-800 mb-2">
                    🕒 Horaires d'ouverture
                  </h4>
                  <div className="space-y-1">
                    {activity.open_hours.regularHours.map((dayHours, index) => {
                      const dayNames = [
                        "Lundi",
                        "Mardi",
                        "Mercredi",
                        "Jeudi",
                        "Vendredi",
                        "Samedi",
                        "Dimanche",
                      ];

                      return (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            {dayNames[dayHours.day]}
                          </span>
                          <span className="text-gray-900">
                            {dayHours.closed
                              ? "Fermé"
                              : `${dayHours.open} - ${dayHours.close}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActivityViewClient() {
  return (
    <ProtectedRoute>
      <ActivityViewContent />
    </ProtectedRoute>
  );
}
