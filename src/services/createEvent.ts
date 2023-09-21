import apiClient from "./api-client";

export type EventPayload = {
  event_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  description: string;
  link_buy_tickets: string;
  artwork: string;
  venue: string;
  city: string;
};

const createEvent = async (
  data: Record<string, unknown>,
  post_token: string
) => {
  return await apiClient.post(`/dj/event/${post_token}`, data);
};

export default createEvent;
