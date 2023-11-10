import apiClient from "../api-client";

const updateUserPaypalEmail = (paypalEmail: string) => {
  return apiClient.patch("/dj/me/paypal", {
    paypal: paypalEmail,
  });
};

export default updateUserPaypalEmail;
