import {
  IAirportSearchItem,
  IItinerarySearchItem,
  IItinerarySearchRequestParams,
} from "../types";
import { apiClient } from "./apiClient";

export const searchAirport = async (
  query: string
): Promise<IAirportSearchItem[]> => {
  const { data: res } = await apiClient.get("/flights/searchAirport", {
    params: { query },
  });
  return res.data as IAirportSearchItem[];
};

// Search flights
export const searchFlights = async (params: IItinerarySearchRequestParams) => {
  const { data: res } = await apiClient.get("/flights/searchFlights", {
    params,
  });
  return res.data.itineraries as IItinerarySearchItem[];
};
