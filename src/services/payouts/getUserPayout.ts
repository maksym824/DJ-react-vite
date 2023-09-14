import { UserPayout } from "~/types";
import apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";

interface PayoutFetch {
  result: boolean;
  data?: {
    available_payout: number;
    payouts: UserPayout[];
    paypal: string;
  };
}

const getUserPayout = () => {
  return apiClient.get<PayoutFetch>("/dj/me/payout").then((res) => {
    return res.data.data;
  });
};

const useUserPayout = () => {
  return useQuery({
    queryKey: ["payout"],
    queryFn: () => getUserPayout(),
  });
};

export { getUserPayout, useUserPayout };
