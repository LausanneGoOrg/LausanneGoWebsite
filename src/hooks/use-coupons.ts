import Coupon, { fetchUserCoupons } from "@/data/coupon";
import { useQuery } from "@tanstack/react-query";
import { useUserId } from "./use-user";

export const useOffers = () => {
  const {
    data: coupons,
    error,
    isLoading,
  } = useQuery({
    queryKey: Coupon.queryKey(),
    queryFn: () => [],
  });

  return {
    coupons: coupons || [], // Valeur par défaut si coupons est undefined
    isLoading,
  } as const;
};

export const useUserCoupons = () => {
  const userId = useUserId();

  const { data: coupons, isLoading } = useQuery({
    queryKey: Coupon.queryKeyByUser(userId ?? ""),
    queryFn: () => fetchUserCoupons(userId ?? ""),
    enabled: !!userId,
  });

  return {
    userCoupons: coupons || [], // Valeur par défaut si coupons est undefined
    isLoading,
  } as const;
};

export const useCashAmount = () => {
  const userId = useUserId();

  const { data: cashAmount, isLoading } = useQuery({
    queryKey: Coupon.queryKeyByUser(userId ?? ""),
    queryFn: () => fetchUserCoupons(userId ?? ""),
    enabled: !!userId,
  });

  return {
    cashAmount: cashAmount || [], // Valeur par défaut si cashAmount est undefined
    isLoading,
  } as const;
};
