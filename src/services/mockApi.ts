// src/services/mockApi.ts
import { IItinerarySearchItem } from "../types";
import searchAirportMock from "./mock/searchAirport.json";
import searchFlightsMock from "./mock/searchFlight.json";

// Fake delay to simulate API
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const searchAirport = async (_query: string) => {
  await delay(300);
  return searchAirportMock.data;
};

export const searchFlights = async (_params: any) => {
  await delay(500);
  return searchFlightsMock.data.itineraries as IItinerarySearchItem[];
};
