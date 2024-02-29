import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../api-client";
import { Event } from "~/types";

interface PostQuery {
  pageSize: number;
  type?: number;
}

const useEvent = (query: PostQuery) => {
  const fetchEvents = (pageParam: number) => {
    return apiClient
      .get<Event[]>("/dj/events", {
        params: {
          _start: (pageParam - 1) * query.pageSize,
          _limit: query.pageSize,
          _type: query.type,
        },
      })
      .then((res) => {
        return res.data;
      });
  };

  return useInfiniteQuery<Event[], Error>({
    queryKey: ["events", query],
    queryFn: ({ pageParam = 1 }) => fetchEvents(pageParam),
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 && lastPage.length === query.pageSize
        ? allPages.length + 1
        : undefined;
    },
  });
};

const deleteEvent = (eventID: number) => {
  return apiClient.delete(`/dj/event/${eventID}`);
};

const getEventById = (eventID: number) => {
  return apiClient.get<Event[]>(`/dj/event/${eventID}`);
};

const updateEvent = (
  eventID: number,
  post_token: string,
  data: Partial<Event>
) => {
  return apiClient.patch<{ result: boolean }>(
    `/dj/event/${eventID}/${post_token}`,
    data
  );
};

export type VenueSearchItem = {
  address: string;
  id: number;
  logo: string;
  name: string;
  photo: string;
};

const searchVenue = (query: string) => {
  return apiClient.get(`/dj/events/venues/search/${query}`);
};

export type EventSearchItem = {
  event_name: string;
  event_date: string;
  start_time: string;
  end_time: string;
  description: string;
  venue_id: number;
  venue_name: string;
};

const searchEvent = (query: string) => {
  return apiClient.get(`/dj/events/names/search/${query}`);
};

export {
  useEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  searchVenue,
  searchEvent,
};
