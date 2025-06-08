import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import {
  fetchAllLocations,
  fetchLocationName,
  setLocationVisited,
} from "@/data/location"; // Fonction qui récupère toutes les locations depuis Supabase
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Router } from "expo-router";
import { i18n } from "@lingui/core";
import { useProfile } from "../use-profile";
import { useSnackbarMessage } from "../use-snackbar";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://vjytomrpbvxefyiflxjn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqeXRvbXJwYnZ4ZWZ5aWZseGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzA4NjAsImV4cCI6MjA1NTY0Njg2MH0.NrWxaHFJELUaZpj3PTdZwwtXntSzI0kYTojUxMiHyCY"
);

export enum VisitStep {
  Start, // Début du parcours
  SUGGESTION, // Proposition d'un lieu à visiter
  COMPASS, // Affichage de la boussole
  NEARBY, // Badge sur la carte quand on est proche
  INFO, // Affichage des informations du lieu
  CONFIRM, // Confirmation de la suite du parcours
}

type POPUP = {
  type: "suggestion" | "confirm";
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
} | null;

const useHandleVisit = (placeDetails: string, router: Router) => {
  const { profile } = useProfile();
  const snackbarMessage = useSnackbarMessage();
  // On démarre en Start (indépendant d'un paramètre externe)
  const [state, setState] = useState(VisitStep.Start);
  const [popup, setPopup] = useState<POPUP>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [heading, setHeading] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [locationData, setLocationData] = useState<any>(null);
  const [currentTargetLocation, setCurrentTargetLocation] =
    useState<Location | null>(null);
  const [showDetails, setShowDetails] = useState("");

  // State pour la target une fois acceptée
  const [targetLocation, setTargetLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [compassDirection, setCompassDirection] = useState<number>(0);

  // State pour gérer la liste complète des locations et le candidat en cours
  const [locations, setLocations] = useState<any[]>([]);
  const [recommendedLocations, setRecommendedLocations] = useState<any[]>([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  
  // Le candidat courant est basé sur les recommandations ou sur la liste complète si pas de recommandations
  const candidate = recommendedLocations.length > 0 
    ? recommendedLocations[recommendationIndex] 
    : locations[0] || null;

  // ref pour le BottomSheetModal
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Fonction pour récupérer les recommandations
  const fetchRecommendations = async () => {
    if (!profile?.user_id || !location) {
      return;
    }
    
    setIsLoadingRecommendations(true);
    
    try {
      const request = {
        body: {
          userId: profile.user_id,
          maxDistance: 1000, // en mètres
          userLatitude: location.coords.latitude,
          userLongitude: location.coords.longitude,
        },
      };
      
      const { data, error } = await supabase.functions.invoke('recommend', request);
      
      if (error) {
        console.error('Error fetching recommendations:', error);
        // Fallback to normal locations if recommendations fail
        setRecommendedLocations([]);
      } else if (data && data.length > 0) {
        console.log('Recommendations received:', data);
        setRecommendedLocations(data);
        setRecommendationIndex(0);
      } else {
        // No recommendations, fallback to normal locations
        setRecommendedLocations([]);
      }
    } catch (error) {
      console.error('Error in recommendation process:', error);
      setRecommendedLocations([]);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  // Récupération des informations du lieu via fetchLocation si placeDetails est fourni
  useEffect(() => {
    if (placeDetails && placeDetails.length > 0) {
      setState(VisitStep.INFO);
      fetchLocationName(placeDetails)
        .then((loc) => {
          setLocationData(loc);
          setLocationVisited(
            profile?.user_id ?? "",
            loc.location_id,
            loc.picture
          );
          setShowDetails(placeDetails);
          bottomSheetModalRef.current?.present();
        })
        .catch((error) =>
          console.error("Erreur lors de la récupération du lieu:", error)
        );
    }
  }, [placeDetails]);

  // Récupération périodique de la position et de l'orientation de l'appareil.
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        snackbarMessage(
          i18n._(
            "Permission to access location was denied. Enable location permissions in your device settings to access the visit."
          ),
          "error"
        );
        router.replace("/");
        return;
      }

      Location.getCurrentPositionAsync({}).then((loc) => setLocation(loc));
      Location.getHeadingAsync().then((headingData) =>
        setHeading(headingData.trueHeading)
      );
    }
    const locationInterval = setInterval(getCurrentLocation, 100);
    return () => clearInterval(locationInterval);
  }, []);

  // Récupération des données de la table Location depuis Supabase.
  useEffect(() => {
    fetchAllLocations()
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => console.error("Erreur fetching locations:", error));
  }, []);

  // Fetch recommendations when location changes significantly
  useEffect(() => {
    if (location && profile?.user_id && state === VisitStep.SUGGESTION) {
      fetchRecommendations();
    }
  }, [location?.coords.latitude, location?.coords.longitude, state]);

  // Calcul de la distance et de l'angle de la boussole par rapport à la target.
  // Si l'utilisateur n'a pas encore accepté une suggestion, on utilise une target par défaut.
  useEffect(() => {
    const currentTarget = targetLocation || {
      latitude: 46.522962,
      longitude: 6.635899,
    };
    if (location) {
      const computedDistance = computeDistanceBetween(
        location.coords,
        currentTarget
      );
      setDistance(computedDistance);
      const compassAngle = getCompassAngle(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        currentTarget,
        heading || 0
      );
      setCompassDirection(Math.round(compassAngle));
      // Passage à NEARBY si dans l'étape COMPASS et si l'utilisateur est proche (<100m)
      if (state === VisitStep.COMPASS && computedDistance < 500) {
        setState(VisitStep.NEARBY);
      }
    }
  }, [location, heading, targetLocation, state]);

  // Fonction pour évoluer dans les étapes du parcours.
  const nextStep = () => {
    switch (state) {
      case VisitStep.Start:
        setState(VisitStep.SUGGESTION);
        break;
      case VisitStep.SUGGESTION:
        setState(VisitStep.COMPASS);
        break;
      case VisitStep.COMPASS:
        setState(VisitStep.NEARBY);
        break;
      case VisitStep.NEARBY:
        setState(VisitStep.INFO);
        break;
      case VisitStep.INFO:
        setState(VisitStep.CONFIRM);
        break;
      case VisitStep.CONFIRM:
        setState(VisitStep.SUGGESTION);
        break;
    }
  };

  // Affichage du popup pour la suggestion de cible.
  useEffect(() => {
    // On ne montre le popup que si on est en étape SUGGESTION et que candidate existe.
    if (state === VisitStep.SUGGESTION && candidate) {
      setPopup({
        type: "suggestion",
        title: i18n._("Next Stop"),
        description: candidate.teaser || i18n._("No teaser available."),
        onConfirm: () => {
          // L'utilisateur accepte : définir candidate comme nouvelle target.
          setTargetLocation({
            latitude: candidate.coordinates ? candidate.coordinates.latitude : candidate.latitude,
            longitude: candidate.coordinates ? candidate.coordinates.longitude : candidate.longitude,
          });
          setPopup(null);
          nextStep();
        },
        onCancel: () => {
          setPopup(null);
          
          if (recommendedLocations.length > 0) {
            setRecommendationIndex((prev) => 
              (prev + 1) % recommendedLocations.length
            );
          } else if (locations.length > 0) {
            fetchRecommendations();
          }          
          setState(VisitStep.SUGGESTION);
        },
      });
    }
  }, [state, candidate, recommendedLocations, recommendationIndex]);

  // Retour des valeurs et fonctions nécessaires.
  return [
    state,
    popup,
    compassDirection,
    distance,
    candidate,
    bottomSheetModalRef,
    locationData,
    showDetails,
    setShowDetails,
    nextStep,
  ] as const;
};

/**
 * Calcule l'angle relatif (en degrés) entre la direction de l'appareil
 * et la cible.
 */
function getCompassAngle(
  userCoords: { latitude: number; longitude: number },
  targetCoords: { latitude: number; longitude: number },
  deviceHeading: number
): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const toDegrees = (radians: number) => (radians * 180) / Math.PI;
  const lat1 = toRadians(userCoords.latitude);
  const lon1 = toRadians(userCoords.longitude);
  const lat2 = toRadians(targetCoords.latitude);
  const lon2 = toRadians(targetCoords.longitude);
  const dLon = lon2 - lon1;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let bearing = Math.atan2(y, x);
  bearing = (toDegrees(bearing) + 360) % 360;
  return (bearing - deviceHeading + 360) % 360;
}

/**
 * Calcule la distance (en mètres) entre deux points sur Terre
 * en utilisant la formule de Haversine.
 */
function computeDistanceBetween(
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number }
): number {
  const R = 6371e3; // Rayon de la Terre en mètres
  const φ1 = (start.latitude * Math.PI) / 180;
  const φ2 = (end.latitude * Math.PI) / 180;
  const Δφ = ((end.latitude - start.latitude) * Math.PI) / 180;
  const Δλ = ((end.longitude - start.longitude) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default useHandleVisit;
