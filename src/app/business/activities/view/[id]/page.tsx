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
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  Activité
                </span>
              </div>
              {business && (
                <p className="text-sm text-gray-600">
                  Proposée par {business.name}
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
                  {activity.contact?.website && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Lien externe
                      </dt>
                      <dd className="text-sm">
                        <a
                          href={activity.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Voir plus d'informations
                        </a>
                      </dd>
                    </div>
                  )}
                  {activity.type && (
                    <>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Type principal
                        </dt>
                        <dd className="text-sm text-gray-900 capitalize">
                          {activity.type.primary}
                        </dd>
                      </div>
                      {activity.type.secondary && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Type secondaire
                          </dt>
                          <dd className="text-sm text-gray-900 capitalize">
                            {activity.type.secondary}
                          </dd>
                        </div>
                      )}
                    </>
                  )}
                  {/* <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Priorité
                    </dt>
                    <dd className="text-sm text-gray-900">
                      {activity.priority}/10
                    </dd>
                  </div> */}
                </dl>
              </div>

              {/* Address & Opening Hours */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Localisation
                </h3>
                {activity.address ? (
                  <dl className="space-y-3 mb-6">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Adresse
                      </dt>
                      <dd className="text-sm text-gray-900">
                        {activity.address.street}
                        <br />
                        {activity.address.postalCode} {activity.address.city}
                        <br />
                        {activity.address.country}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="text-sm text-gray-500 mb-6">
                    Aucune adresse spécifiée
                  </p>
                )}

                {activity.open_hours && (
                  <div>
                    <h4 className="text-md font-medium text-gray-800 mb-3">
                      Horaires d'ouverture
                    </h4>
                    <dl className="space-y-2 text-sm">
                      {Object.entries(activity.open_hours).map(
                        ([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <dt className="text-gray-500 capitalize">{day}:</dt>
                            <dd className="text-gray-900">
                              {hours.isClosed ? (
                                <span className="text-red-600">Fermé</span>
                              ) : (
                                <span>
                                  {hours.open} - {hours.close}
                                </span>
                              )}
                            </dd>
                          </div>
                        )
                      )}
                    </dl>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-medium text-gray-800 mb-2">
                Informations supplémentaires
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">ID d'activité:</span>
                  <span className="ml-2 text-gray-900 font-mono text-xs">
                    {activity.activity_id}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Statut:</span>
                  <span className="ml-2 text-green-600 font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActivityViewPage() {
  return (
    <ProtectedRoute>
      <ActivityViewContent />
    </ProtectedRoute>
  );
}
