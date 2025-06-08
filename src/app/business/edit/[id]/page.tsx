"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUserBusiness, useUpdateBusiness } from "@/hooks/use-business";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BusinessPrimaryType, BusinessSecondaryType } from "@/data/business";
import { OpeningHours, RegularHours, SpecialDate } from "@/data/utils/opening";

const businessTypes = {
  food: [
    "fine_dining",
    "casual",
    "fast_food",
    "cafe",
    "bakery",
    "swiss",
    "italian",
    "asian",
    "other",
  ],
  drink: [
    "bar",
    "pub",
    "wine_bar",
    "brewery",
    "coffee_shop",
    "tea_house",
    "other",
  ],
  culture: [
    "museum",
    "gallery",
    "theater",
    "cinema",
    "library",
    "historical_site",
    "other",
  ],
  shopping: ["boutique", "mall", "grocery", "bookstore", "market", "other"],
  nightlife: ["club", "live_music", "lounge", "jazz_club", "other"],
  outdoor: ["park", "beach", "hiking", "sports_facility", "other"],
  service: ["salon", "spa", "fitness", "banking", "post", "other"],
};

const DAY_NAMES = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

function EditBusinessContent() {
  const params = useParams();
  const router = useRouter();
  const businessId = params.id as string;
  const { data: business, isLoading: loadingBusiness } =
    useUserBusiness(businessId);
  const updateBusiness = useUpdateBusiness();

  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    primaryType: "" as BusinessPrimaryType,
    secondaryType: "" as BusinessSecondaryType,
  });

  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    regularHours: [],
    specialDates: [],
    permanentlyClosed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load business data into form when available
  useEffect(() => {
    if (business) {
      setFormData({
        name: business.name || "",
        picture: business.picture || "",
        street: business.address?.street || "",
        city: business.address?.city || "",
        postalCode: business.address?.postalCode || "",
        country: business.address?.country || "",
        primaryType: business.type?.primary || ("" as BusinessPrimaryType),
        secondaryType:
          business.type?.secondary || ("" as BusinessSecondaryType),
      });

      // Initialize opening hours
      if (business.open_hours) {
        setOpeningHours(business.open_hours);
      } else {
        // Initialize with default regular hours for each day
        const defaultRegularHours: RegularHours[] = Array.from(
          { length: 7 },
          (_, index) => ({
            day: index,
            closed: true,
          })
        );
        setOpeningHours({
          regularHours: defaultRegularHours,
          specialDates: [],
          permanentlyClosed: false,
        });
      }
    }
  }, [business]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (
    field: keyof Address,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      address: prev.address
        ? {
            ...prev.address,
            [field]: value,
          }
        : {
            street: "",
            city: "",
            zip: "",
            country: "",
            [field]: value,
          },
    }));
  };

  const handleTypeChange = (field: "primary" | "secondary", value: string) => {
    if (field === "primary" && value !== "") {
      setFormData((prev) => ({
        ...prev,
        type: {
          primary: value as ActivityPrimaryType,
          secondary: prev.type?.secondary || "other",
        },
      }));
    } else if (field === "secondary" && value !== "") {
      setFormData((prev) => ({
        ...prev,
        type: prev.type
          ? {
              ...prev.type,
              secondary: value as ActivitySecondaryType,
            }
          : {
              primary: "outdoor",
              secondary: value as ActivitySecondaryType,
            },
      }));
    }
  };

  const handleOpeningHoursChange = (
    day: number,
    field: "open" | "close",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      open_hours: prev.open_hours
        ? {
            ...prev.open_hours,
            openings: prev.open_hours.openings.map((opening) =>
              opening.day === day
                ? {
                    ...opening,
                    [field]: value,
                  }
                : opening
            ),
          }
        : null,
    }));
  };

  const updateRegularHours = (
    day: number,
    field: keyof RegularHours,
    value: any
  ) => {
    setOpeningHours((prev) => ({
      ...prev,
      regularHours: prev.regularHours.map((hours) =>
        hours.day === day
          ? {
              ...hours,
              [field]: value,
              ...(field === "closed" && value
                ? { open: undefined, close: undefined }
                : {}),
            }
          : hours
      ),
    }));
  };

  const addSpecialDate = () => {
    const newSpecialDate: SpecialDate = {
      date: new Date().toISOString().split("T")[0],
      open: "09:00",
      close: "17:00",
      closed: false,
    };
    setOpeningHours((prev) => ({
      ...prev,
      specialDates: [...(prev.specialDates || []), newSpecialDate],
    }));
  };

  const updateSpecialDate = (
    index: number,
    field: keyof SpecialDate,
    value: any
  ) => {
    setOpeningHours((prev) => ({
      ...prev,
      specialDates:
        prev.specialDates?.map((date, i) =>
          i === index
            ? {
                ...date,
                [field]: value,
                ...(field === "closed" && value ? { open: "", close: "" } : {}),
              }
            : date
        ) || [],
    }));
  };

  const removeSpecialDate = (index: number) => {
    setOpeningHours((prev) => ({
      ...prev,
      specialDates: prev.specialDates?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const businessData = {
        business_id: businessId,
        name: formData.name,
        picture: formData.picture,
        address: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        type: {
          primary: formData.primaryType,
          secondary: formData.secondaryType,
        },
        open_hours: openingHours,
      };

      await updateBusiness.mutateAsync(businessData);
      router.push(`/business/view/${businessId}`);
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  if (loadingBusiness) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Établissement non trouvé</div>
        <button
          onClick={() => router.push("/business/dashboard")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Retour au dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <button
                  onClick={() => router.push(`/business/view/${businessId}`)}
                  className="text-indigo-600 hover:text-indigo-500 mb-2 flex items-center"
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
                  Retour aux détails
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Modifier {business?.name}
                </h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Informations générales */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Informations générales
              </h3>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom de l'établissement *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="picture"
                  className="block text-sm font-medium text-gray-700"
                >
                  URL de l'image
                </label>
                <input
                  type="url"
                  id="picture"
                  name="picture"
                  value={formData.picture}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="primaryType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type principal *
                  </label>
                  <select
                    id="primaryType"
                    name="primaryType"
                    required
                    value={formData.primaryType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="food">Restauration</option>
                    <option value="drink">Boisson</option>
                    <option value="culture">Culture</option>
                    <option value="shopping">Commerce</option>
                    <option value="nightlife">Vie nocturne</option>
                    <option value="outdoor">Activités extérieures</option>
                    <option value="service">Services</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="secondaryType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type secondaire
                  </label>
                  <select
                    id="secondaryType"
                    name="secondaryType"
                    value={formData.secondaryType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    disabled={!formData.primaryType}
                  >
                    <option value="">Sélectionner un sous-type</option>
                    {formData.primaryType &&
                      businessTypes[
                        formData.primaryType as keyof typeof businessTypes
                      ]?.map((type) => (
                        <option key={type} value={type}>
                          {type.replace(/_/g, " ")}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Adresse */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Adresse</h3>

              <div>
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rue *
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code postal *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ville *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Pays *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Horaires d'ouverture */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Horaires d'ouverture
                </h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={openingHours.permanentlyClosed}
                    onChange={(e) =>
                      setOpeningHours((prev) => ({
                        ...prev,
                        permanentlyClosed: e.target.checked,
                      }))
                    }
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Fermé définitivement
                  </span>
                </label>
              </div>

              {!openingHours.permanentlyClosed && (
                <>
                  {/* Horaires réguliers */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-800">
                      Horaires réguliers
                    </h4>
                    <div className="space-y-3">
                      {DAY_NAMES.map((dayName, dayIndex) => {
                        const dayHours = openingHours.regularHours.find(
                          (h) => h.day === dayIndex
                        ) || { day: dayIndex, closed: true };

                        return (
                          <div
                            key={dayIndex}
                            className="grid grid-cols-4 gap-4 items-center p-3 bg-gray-50 rounded-md"
                          >
                            <div className="text-sm font-medium text-gray-700">
                              {dayName}
                            </div>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={!!dayHours.closed}
                                onChange={(e) =>
                                  updateRegularHours(
                                    dayIndex,
                                    "closed",
                                    e.target.checked
                                  )
                                }
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                Fermé
                              </span>
                            </div>
                            <div>
                              <input
                                type="time"
                                value={dayHours.open || ""}
                                onChange={(e) =>
                                  updateRegularHours(
                                    dayIndex,
                                    "open",
                                    e.target.value
                                  )
                                }
                                disabled={!!dayHours.closed}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                placeholder="Ouverture"
                              />
                            </div>
                            <div>
                              <input
                                type="time"
                                value={dayHours.close || ""}
                                onChange={(e) =>
                                  updateRegularHours(
                                    dayIndex,
                                    "close",
                                    e.target.value
                                  )
                                }
                                disabled={!!dayHours.closed}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                                placeholder="Fermeture"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dates spéciales */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-medium text-gray-800">
                        Dates spéciales
                      </h4>
                      <button
                        type="button"
                        onClick={addSpecialDate}
                        className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      >
                        + Ajouter une date
                      </button>
                    </div>

                    {openingHours.specialDates?.map((specialDate, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-5 gap-4 items-center p-3 bg-yellow-50 rounded-md border border-yellow-200"
                      >
                        <div>
                          <input
                            type="date"
                            value={specialDate.date}
                            onChange={(e) =>
                              updateSpecialDate(index, "date", e.target.value)
                            }
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={specialDate.closed}
                            onChange={(e) =>
                              updateSpecialDate(
                                index,
                                "closed",
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Fermé
                          </span>
                        </div>
                        <div>
                          <input
                            type="time"
                            value={specialDate.open}
                            onChange={(e) =>
                              updateSpecialDate(index, "open", e.target.value)
                            }
                            disabled={specialDate.closed}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                            placeholder="Ouverture"
                          />
                        </div>
                        <div>
                          <input
                            type="time"
                            value={specialDate.close}
                            onChange={(e) =>
                              updateSpecialDate(index, "close", e.target.value)
                            }
                            disabled={specialDate.closed}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
                            placeholder="Fermeture"
                          />
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => removeSpecialDate(index)}
                            className="px-2 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Boutons d'action */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push(`/business/view/${businessId}`)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? "Modification..." : "Sauvegarder les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function EditBusinessPage() {
  return (
    <ProtectedRoute>
      <EditBusinessContent />
    </ProtectedRoute>
  );
}
