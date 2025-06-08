import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditActivityPage({
  params,
}: {
  params: { business_id: string; activity_id: string };
}) {
  const router = useRouter();
  const { business_id, activity_id } = params;

  const [activity, setActivity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: {
      primary: "",
      secondary: "",
    },
    estimatedDuration: 0,
    difficulty: 1,
    maxParticipants: 0,
    minAge: 0,
    isActive: true,
  });

  // Fetch activity details
  useEffect(() => {
    const fetchActivity = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await trpc.activity.getById.query({ id: activity_id });
        setActivity(data);

        // Set form data
        setFormData({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          type: {
            primary: data.type?.primary || "",
            secondary: data.type?.secondary || "",
          },
          estimatedDuration: data.estimatedDuration || 0,
          difficulty: data.difficulty || 1,
          maxParticipants: data.maxParticipants || 0,
          minAge: data.minAge || 0,
          isActive: data.isActive !== undefined ? data.isActive : true,
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, [activity_id]);

  // Update activity
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Validation
    if (!formData.title.trim()) {
      setIsUpdating(false);
      return;
    }

    if (!formData.description.trim()) {
      setIsUpdating(false);
      return;
    }

    if (!formData.type.primary) {
      setIsUpdating(false);
      return;
    }

    if (!formData.type.secondary) {
      showSnackbar("Le type secondaire est requis", "error");
      setIsUpdating(false);
      return;
    }

    try {
      await trpc.activity.update.mutate({
        id: activity_id,
        data: {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          type: formData.type,
          estimatedDuration: formData.estimatedDuration,
          difficulty: formData.difficulty,
          maxParticipants: formData.maxParticipants,
          minAge: formData.minAge,
          isActive: formData.isActive,
        },
      });

      router.push(`/activities/${activity_id}`);
    } catch (err) {
      setError(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Modifier l'activité</h1>

      {isLoading && <div>Chargement...</div>}
      {error && <div className="text-red-500">Erreur: {error.message}</div>}

      {activity && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Titre de l'activité *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          {/* Description field */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full p-3 border rounded-lg h-32"
              required
            />
          </div>

          {/* Location field */}
          <div>
            <label className="block text-sm font-medium mb-2">Lieu</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Activity type fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Type primaire *
              </label>
              <select
                value={formData.type.primary}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: { ...prev.type, primary: e.target.value },
                  }))
                }
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="cultural">Culturel</option>
                <option value="outdoor">Extérieur</option>
                <option value="indoor">Intérieur</option>
                <option value="educational">Éducatif</option>
                <option value="entertainment">Divertissement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Type secondaire *
              </label>
              <select
                value={formData.type.secondary}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: { ...prev.type, secondary: e.target.value },
                  }))
                }
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Sélectionner un sous-type</option>
                <option value="museum">Musée</option>
                <option value="tour">Visite guidée</option>
                <option value="workshop">Atelier</option>
                <option value="game">Jeu</option>
                <option value="sport">Sport</option>
                <option value="art">Art</option>
                <option value="history">Histoire</option>
                <option value="nature">Nature</option>
              </select>
            </div>
          </div>

          {/* Numeric fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Durée estimée (minutes)
              </label>
              <input
                type="number"
                value={formData.estimatedDuration}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    estimatedDuration: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full p-3 border rounded-lg"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Difficulté (1-5)
              </label>
              <input
                type="number"
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    difficulty: parseInt(e.target.value) || 1,
                  }))
                }
                className="w-full p-3 border rounded-lg"
                min="1"
                max="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Participants max
              </label>
              <input
                type="number"
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxParticipants: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full p-3 border rounded-lg"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Âge minimum
              </label>
              <input
                type="number"
                value={formData.minAge}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minAge: parseInt(e.target.value) || 0,
                  }))
                }
                className="w-full p-3 border rounded-lg"
                min="0"
              />
            </div>
          </div>

          {/* Active status */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
                className="mr-2"
              />
              Activité active
            </label>
          </div>

          {/* Submit button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isUpdating ? "Mise à jour..." : "Mettre à jour l'activité"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
