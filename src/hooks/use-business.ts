import { fetchBusinessesByOwner, fetchBusinessesByType } from "@/data/business";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/services/database";
import Business, { fetchBusiness } from "@/data/business";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "./use-profile";
import { useEffect } from "react";

export const useBars = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["bars"],
    queryFn: () => fetchBusinessesByType(["nightlife", "drink"]),
  });

  return {
    bars: data || [],
    isLoading,
  } as const;
};

/**
 * Hook to fetch businesses owned by the authenticated user
 */
export function useUserBusinesses() {
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile?.user_id) {
      console.warn(
        "No user ID found in profile, businesses query will not run."
      );
    } else {
      console.log("Fetching businesses for user ID:", profile);
    }
  }, [profile?.user_id]);

  return useQuery({
    queryKey: ["businesses", "user", profile?.user_id],
    queryFn: async () => {
      const businesses = await fetchBusinessesByOwner(
        profile?.user_id || "",
        profile?.is_admin 
      );
      return businesses;
    },
    enabled: !!profile?.user_id,
  });
}

/**
 * Hook to fetch a specific business by ID (only if owned by the user)
 */
export function useUserBusiness(businessId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["business", businessId, "user", user?.id],
    queryFn: async () => {
      const business = await fetchBusiness(businessId);
      return business;
    },
    enabled: !!user?.id && !!businessId,
  });
}

/**
 * Hook to update a business
 */
export function useUpdateBusiness() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (
      business: Partial<Business> & { business_id: string }
    ) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("Business")
        .update({
          name: business.name,
          address: business.address,
          open_hours: business.open_hours,
          picture: business.picture,
          business_type: business.type,
        })
        .eq("business_id", business.business_id)
        .eq("business_owner", user.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch business queries
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      queryClient.invalidateQueries({
        queryKey: ["business", data.business_id],
      });
    },
  });
}

/**
 * Hook to create a new business
 */
export function useCreateBusiness() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (business: Omit<Business, "business_id">) => {
      if (!user?.id) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("Business")
        .insert({
          name: business.name,
          address: business.address,
          open_hours: business.open_hours,
          picture: business.picture,
          business_type: business.type,
          business_owner: user.id,
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch business queries
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
  });
}

/**
 * Hook to fetch a specific business by ID
 */
export const useBusiness = (businessId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: Business.queryKeyById(businessId),
    queryFn: () => fetchBusiness(businessId),
    enabled: !!businessId,
  });

  return {
    data,
    isLoading,
    error,
  } as const;
};
