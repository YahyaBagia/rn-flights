import {
  searchAirport as searchAirportReal,
  searchFlights as searchFlightsReal,
} from "./api";
import {
  searchAirport as searchAirportMock,
  searchFlights as searchFlightsMock,
} from "./mockApi";

const USE_MOCK = true;

const searchFlights = USE_MOCK ? searchFlightsMock : searchFlightsReal;
const searchAirport = USE_MOCK ? searchAirportMock : searchAirportReal;

export { searchAirport, searchFlights };
