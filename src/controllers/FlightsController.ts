import { useState } from "react";
import { Alert } from "react-native";
import {
  CalendarDate,
  SingleChange,
  ValidRangeType,
} from "react-native-paper-dates/lib/typescript/Date/Calendar";

import { IMenuButtonItem } from "../components/MenuButton";
import { searchFlights } from "../services";
import { useAuthStore } from "../store/globalStore";
import {
  IAirportSearchItem,
  IItinerarySearchItem,
  IItinerarySearchRequestParams,
  TCabinClass,
  TTripType,
} from "../types";

const CabinClasses: { label: string; value: TCabinClass }[] = [
  { label: "Economy", value: "economy" },
  { label: "Premium Economy", value: "premium_economy" },
  { label: "Business", value: "business" },
  { label: "First", value: "first" },
] as const;

const TripTypes: { label: string; value: TTripType }[] = [
  { label: "Round Trip", value: "round_trip" },
  { label: "One Way", value: "one_way" },
] as const;

const useFlightsController = () => {
  //#region - Cabin Class
  const [cabinClass, setCabinClass] = useState<IMenuButtonItem>(
    CabinClasses[0]
  );

  const onCabinClassSelected = (cabinClass: IMenuButtonItem) =>
    setCabinClass(cabinClass);
  //#endregion

  //#region - Trip Type
  const [tripType, setTripType] = useState<IMenuButtonItem>(TripTypes[0]);

  const onTripTypeSelected = (tripType: IMenuButtonItem) =>
    setTripType(tripType);
  //#endregion

  //#region - Airports
  const [airportPickerFor, setAirportPickerFor] = useState<
    "from" | "to" | undefined
  >();

  const [fromAirport, setFromAirport] = useState<IAirportSearchItem>();
  const [toAirport, setToAirport] = useState<IAirportSearchItem>();

  const onPressFromAirport = () => setAirportPickerFor("from");
  const onPressToAirport = () => setAirportPickerFor("to");

  const dismissAirportPicker = () => setAirportPickerFor(undefined);

  const onAirportSelected = (airport: IAirportSearchItem) => {
    if (airportPickerFor === "from") setFromAirport(airport);
    if (airportPickerFor === "to") setToAirport(airport);
  };

  const onAirportSwap = () => {
    const temp = fromAirport;
    setFromAirport(toAirport);
    setToAirport(temp);
  };
  //#endregion

  //#region - Date Picker
  const [datePickerFor, setDatePickerFor] = useState<
    "departure" | "return" | undefined
  >();

  const [departureDate, setDepartureDate] = useState<CalendarDate>();
  const [returnDate, setReturnDate] = useState<CalendarDate>();

  const onPressDepartureDate = () => setDatePickerFor("departure");
  const onPressReturnDate = () => setDatePickerFor("return");

  const dismissDatePicker = () => setDatePickerFor(undefined);

  const onDateSelected: SingleChange = (params) => {
    const { date } = params;
    if (datePickerFor === "departure") setDepartureDate(date);
    if (datePickerFor === "return") setReturnDate(date);
    console.log(date);
    dismissDatePicker();
  };

  const getDepartureDateRanges = (): ValidRangeType => ({
    startDate: new Date(),
  });

  const getReturnDateRanges = (): ValidRangeType => {
    if (!departureDate) return {};
    return {
      startDate: new Date(departureDate.getTime() + 86400000),
    };
  };
  //#endregion

  //#region - Explore
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<
    IItinerarySearchItem | undefined
  >();
  const [flights, setFlights] = useState<IItinerarySearchItem[]>();
  const exploreDisabled = !fromAirport || !toAirport || !departureDate;

  const onPressExplore = async () => {
    if (exploreDisabled) return;

    setIsLoading(true);
    const params: IItinerarySearchRequestParams = {
      originSkyId: fromAirport?.navigation.relevantFlightParams.skyId,
      originEntityId: fromAirport?.navigation.relevantFlightParams.entityId,
      destinationSkyId: toAirport?.navigation.relevantFlightParams.skyId,
      destinationEntityId: toAirport?.navigation.relevantFlightParams.entityId,
      date: departureDate.toISOString().split(`T`)[0],
      returnDate: returnDate?.toISOString().split(`T`)[0],
      cabinClass: cabinClass.value as TCabinClass,
    };

    try {
      const results = await searchFlights(params);
      setFlights(results);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const onPressFlight = (flight: IItinerarySearchItem) => {
    setSelectedFlight(flight);
  };

  const clearSelectedFlight = () => setSelectedFlight(undefined);
  //#endregion

  const { logout } = useAuthStore();
  const onPressLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Yes", onPress: logout },
      { text: "Cancel" },
    ]);
  };

  return {
    //#region - Cabin Class
    cabinClass,
    onCabinClassSelected,
    //#endregion

    //#region - Trip Type
    tripType,
    onTripTypeSelected,
    //#endregion

    //#region - Airports
    airportPickerFor,
    fromAirport,
    toAirport,

    onPressFromAirport,
    onPressToAirport,
    dismissAirportPicker,
    onAirportSelected,
    onAirportSwap,
    //#endregion

    //#region - Date Picker
    datePickerFor,
    departureDate,
    returnDate,

    onPressDepartureDate,
    onPressReturnDate,
    dismissDatePicker,
    onDateSelected,
    getDepartureDateRanges,
    getReturnDateRanges,
    //#endregion

    //#region - Constants
    CabinClasses,
    TripTypes,
    //#endregion

    //#region - Explore
    isLoading,
    selectedFlight,
    clearSelectedFlight,
    flights,
    exploreDisabled,
    onPressExplore,
    onPressFlight,
    //#endregion

    onPressLogout,
  };
};

export { useFlightsController };
