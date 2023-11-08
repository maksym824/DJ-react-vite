import { useQuery } from "@tanstack/react-query";
import apiClient from "./api-client";

const getUserChatToken = async () => {
  return apiClient.get("/dj/me/stream/token").then((res) => {
    if (res?.data?.result) return res?.data?.token;
    return "";
  });
};

const useUserChatToken = () => {
  return useQuery({
    queryKey: ["userChatToken"],
    queryFn: () => getUserChatToken(),
  });
};

export default useUserChatToken;
