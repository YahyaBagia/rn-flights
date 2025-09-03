export type TCabinClass = "economy" | "premium_economy" | "business" | "first";

export type TTripType = "round_trip" | "one_way";

export type TSortBy =
  | "best"
  | "price_high"
  | "fastest"
  | "outbound_take_off_time"
  | "outbound_landing_time"
  | "return_landing_time";

export interface IAirportSearchItem {
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}

export interface IItinerarySearchRequestParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  returnDate?: string;
  cabinClass: TCabinClass;
  adults?: number;
  children?: number;
  infants?: number;
  sortBy?: TSortBy;
  currency?: string;
  market?: string;
  countryCode?: string;
}

export interface IItinerarySearchItem {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: FlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  eco: {
    ecoContenderDelta: number;
  };
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface FlightLeg {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string; // ISO datetime
  arrival: string; // ISO datetime
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operationType: string; // could be narrowed if API docs define allowed values
  };
  segments: FlightSegment[];
}

export interface FlightPlace {
  id: string;
  name: string;
  displayCode: string;
  city: string;
  isHighlighted: boolean;
}

export interface FlightSegment {
  id: string;
  origin: FlightSegmentPlace;
  destination: FlightSegmentPlace;
  departure: string; // ISO datetime
  arrival: string; // ISO datetime
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: CarrierDetail;
  operatingCarrier: CarrierDetail;
}

export interface FlightSegmentPlace {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: "City" | "Airport" | string;
  };
  name: string;
  type: "City" | "Airport" | string;
}

export interface Carrier {
  id: number;
  logoUrl: string;
  name: string;
}

export interface CarrierDetail {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
}
