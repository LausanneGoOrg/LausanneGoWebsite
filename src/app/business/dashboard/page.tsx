"use client";

import { useAuth } from "@/contexts/auth-context";
import { useUserBusinesses } from "@/hooks/use-business";
import { useActivities } from "@/hooks/use-activities";
import { useEvents } from "@/hooks/use-events";
import { useChallenges } from "@/hooks/use-challenges";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useIsAdmin, useProfile } from "@/hooks/use-profile";

function BusinessCard({ business }: { business: any }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={business.picture || "/placeholder-business.jpg"}
          alt={business.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {business.name}
        </h3>
        <p className="text-gray-600 mb-2">
          {business.type?.primary && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {business.type.primary}
            </span>
          )}
        </p>
        <p className="text-gray-500 text-sm mb-4">
          {business.address?.street || "Adresse non renseignée"}
        </p>
        <div className="flex justify-between items-center">
          <button
            onClick={() =>
              router.push(`/business/edit/${business.business_id}`)
            }
            className="bg-primary-red text-white px-4 py-2 rounded-md text-sm hover:bg-primary-red-dark"
          >
            Modifier
          </button>
          <button
            onClick={() =>
              router.push(`/business/view/${business.business_id}`)
            }
            className="text-primary-red px-4 py-2 rounded-md text-sm hover:bg-red-50"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: any }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={activity.picture || "/placeholder-activity.jpg"}
          alt={activity.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {activity.title}
        </h3>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {activity.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-primary-red">
            {activity.price > 0 ? `${activity.price} CHF` : "Gratuit"}
          </span>
          {activity.type?.primary && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {activity.type.primary}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() =>
              router.push(`/business/activities/edit/${activity.activity_id}`)
            }
            className="bg-primary-red text-white px-4 py-2 rounded-md text-sm hover:bg-primary-red-dark"
          >
            Modifier
          </button>
          <button
            onClick={() =>
              router.push(`/business/activities/view/${activity.activity_id}`)
            }
            className="text-primary-red px-4 py-2 rounded-md text-sm hover:bg-red-50"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={event.picture || "/placeholder-event.jpg"}
          alt={event.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-2 line-clamp-2">{event.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-primary-red">
            {event.price > 0 ? `${event.price} CHF` : "Gratuit"}
          </span>
          {event.startDate && (
            <span className="text-sm text-gray-500">
              {new Date(event.startDate).toLocaleDateString("fr-FR")}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() =>
              router.push(`/business/events/edit/${event.event_id}`)
            }
            className="bg-primary-red text-white px-4 py-2 rounded-md text-sm hover:bg-primary-red-dark"
          >
            Modifier
          </button>
          <button
            onClick={() =>
              router.push(`/business/events/view/${event.event_id}`)
            }
            className="text-primary-red px-4 py-2 rounded-md text-sm hover:bg-red-50"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({ challenge }: { challenge: any }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={challenge.picture || "/placeholder-challenge.jpg"}
          alt={challenge.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {challenge.title}
        </h3>
        <p className="text-gray-600 mb-2 line-clamp-2">
          {challenge.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-purple-600">
            {challenge.reward_points || 0} points
          </span>
          {challenge.difficulty && (
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full ${
                challenge.difficulty === "easy"
                  ? "bg-green-100 text-green-800"
                  : challenge.difficulty === "medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {challenge.difficulty}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() =>
              router.push(`/business/challenges/edit/${challenge.challenge_id}`)
            }
            className="bg-primary-red text-white px-4 py-2 rounded-md text-sm hover:bg-primary-red-dark"
          >
            Modifier
          </button>
          <button
            onClick={() =>
              router.push(`/business/challenges/view/${challenge.challenge_id}`)
            }
            className="text-primary-red px-4 py-2 rounded-md text-sm hover:bg-red-50"
          >
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const { user, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const {
    data: businesses,
    isLoading: businessesLoading,
    error: businessesError,
  } = useUserBusinesses();
  const { activities, isLoading: activitiesLoading } = useActivities();
  const { events, isLoading: eventsLoading } = useEvents();
  const { challenges, isLoading: challengesLoading } = useChallenges();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "businesses" | "activities" | "events" | "challenges"
  >("businesses");

  const handleSignOut = async () => {
    await signOut();
    router.push("/business/login");
  };

  // Filter activities, events and challenges for current user's businesses
  const userBusinessIds = businesses?.map((b) => b.business_id) || [];
  const userActivities =
    activities?.filter(
      (activity) => userBusinessIds.includes(activity.business_id) || isAdmin
    ) || [];
  const userEvents =
    events?.filter(
      (event) => userBusinessIds.includes(event.business_id) || isAdmin
    ) || [];
  const userChallenges =
    challenges?.filter((challenge) =>
      userBusinessIds.includes(challenge.business_id)
    ) || [];

  const isLoading =
    businessesLoading ||
    activitiesLoading ||
    eventsLoading ||
    challengesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-red"></div>
      </div>
    );
  }

  if (businessesError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          Erreur lors du chargement de vos données: {businessesError.message}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const TabButton = ({
    tab,
    label,
    count,
  }: {
    tab: typeof activeTab;
    label: string;
    count?: number;
  }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-3 font-medium text-sm rounded-lg transition-colors ${
        activeTab === tab
          ? "bg-primary-red text-white"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label} {count !== undefined && `(${count})`}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Entreprise
              </h1>
              <p className="text-gray-600">Bienvenue, {user?.email}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push("/business/create")}
                className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
              >
                Ajouter un établissement
              </button>
              <button
                onClick={handleSignOut}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-primary-red"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Établissements
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {businesses?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
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
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Activités</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userActivities.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Événements</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userEvents.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Défis</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {userChallenges.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <TabButton
            tab="businesses"
            label="Établissements"
            count={businesses?.length || 0}
          />
          <TabButton
            tab="activities"
            label="Activités"
            count={userActivities.length}
          />
          <TabButton
            tab="events"
            label="Événements"
            count={userEvents.length}
          />
          <TabButton
            tab="challenges"
            label="Défis"
            count={userChallenges.length}
          />
        </div>

        {/* Tab Content */}
        {activeTab === "businesses" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Vos établissements
              </h2>
            </div>

            {businesses && businesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((business) => (
                  <BusinessCard
                    key={business.business_id}
                    business={business}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucun établissement
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Commencez par ajouter votre premier établissement.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push("/business/create")}
                    className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
                  >
                    Ajouter un établissement
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "activities" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Vos activités
              </h2>
              <button
                onClick={() => router.push("/business/activities/create")}
                className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
              >
                Ajouter une activité
              </button>
            </div>

            {userActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userActivities.map((activity) => (
                  <ActivityCard
                    key={activity.activity_id}
                    activity={activity}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucune activité
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Commencez par ajouter votre première activité.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push("/business/activities/create")}
                    className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
                  >
                    Ajouter une activité
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "events" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Vos événements
              </h2>
              <button
                onClick={() => router.push("/business/events/create")}
                className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
              >
                Ajouter un événement
              </button>
            </div>

            {userEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userEvents.map((event) => (
                  <EventCard key={event.event_id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucun événement
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Commencez par ajouter votre premier événement.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push("/business/events/create")}
                    className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
                  >
                    Ajouter un événement
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "challenges" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Vos défis</h2>
              <button
                onClick={() => router.push("/business/challenges/create")}
                className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
              >
                Ajouter un défi
              </button>
            </div>

            {userChallenges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userChallenges.map((challenge) => (
                  <ChallengeCard
                    key={challenge.challenge_id}
                    challenge={challenge}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Aucun défi
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Commencez par ajouter votre premier défi.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => router.push("/business/challenges/create")}
                    className="bg-primary-red text-white px-4 py-2 rounded-md hover:bg-primary-red-dark"
                  >
                    Ajouter un défi
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BusinessDashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
