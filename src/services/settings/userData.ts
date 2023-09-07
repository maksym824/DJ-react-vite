import { useQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { User } from "~/types";

interface UserFetch {
  result: User;
}

const getUserData = () => {
  return apiClient.get<UserFetch>("/dj/me/details").then((res) => {
    return res.data.result;
  });
};

const useUserData = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });
};

export { getUserData };
export default useUserData;
