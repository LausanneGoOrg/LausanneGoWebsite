"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateBusiness } from "@/hooks/use-business";
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

function CreateBusinessContent() {
  const router = useRouter();
  const createBusiness = useCreateBusiness();

  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    street: "",
    city: "Lausanne",
    postalCode: "",
    country: "Suisse",
    primaryType: "" as BusinessPrimaryType,
    secondaryType: "" as BusinessSecondaryType,
  });

  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    regularHours: Array.from({ length: 7 }, (_, index) => ({
      day: index,
      closed: true,
    })),
    specialDates: [],
    permanentlyClosed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      await createBusiness.mutateAsync(businessData);
      router.push("/business/dashboard");
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              Ajouter un nouvel établissement
            </h1>
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
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
                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
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
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
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
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
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
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
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
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
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
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
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
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
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
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 disabled:bg-gray-100"
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
                onClick={() => router.push("/business/dashboard")}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-red hover:bg-primary-red focus:outline-none focus:ring-2 focus:ring-offset-2 ring-primary-red disabled:opacity-50"
              >
                {loading ? "Création..." : "Créer l'établissement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CreateBusinessPage() {
  return (
    <ProtectedRoute>
      <CreateBusinessContent />
    </ProtectedRoute>
  );
}
