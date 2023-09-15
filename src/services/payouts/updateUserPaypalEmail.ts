import apiClient from "../api-client";

const updateUserPaypalEmail = (paypalEmail: string) => {
  return apiClient.post("/dj/me/details", {
    paypal: paypalEmail,
  });
};

export default updateUserPaypalEmail;
