import { useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";

const getPartnerArtists = async () => {
  const res = await apiClient.get(`/dj/partner_artist`);
  const { data } = res;
  return data ?? [];
};

const usePartnerArtists = () => {
  return useQuery({
    queryKey: ["partner-artists"],
    queryFn: () => getPartnerArtists(),
  });
};

export { getPartnerArtists, usePartnerArtists };
