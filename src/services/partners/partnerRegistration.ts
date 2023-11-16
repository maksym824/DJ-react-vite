import apiClient from "../api-client";

export type PartnerRegistrationPayload = {
  partner_type: string;
  dj_count: string;
  first_name: string;
  last_name: string;
  phone: string;
  company: string;
  email: string;
  re_email: string;
  password: string;
  re_password: string;
};

const createPartner = (payload: PartnerRegistrationPayload) => {
  return apiClient.post("/partner/registration", payload);
};

export { createPartner };
