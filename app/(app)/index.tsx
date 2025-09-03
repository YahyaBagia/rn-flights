import { FlashList } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  IconButton,
  TextInput,
} from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

import {
  AirportPickerDialog,
  FlightItem,
  ItineraryDetailsDialog,
  MenuButton,
  TextFieldButton,
} from "@/src/components";
import { useFlightsController } from "@/src/controllers/FlightsController";
import { DateTime } from "luxon";

export default function Index() {
  const {
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
  } = useFlightsController();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Flights",
          headerRight: () => (
            <IconButton icon={"logout"} onPress={onPressLogout} />
          ),
        }}
      />
      <FlashList
        data={flights}
        renderItem={({ item }) => (
          <FlightItem flightItem={item} onPress={onPressFlight} />
        )}
        ListHeaderComponent={() => {
          return (
            <Card style={styles.card}>
              <Card.Content>
                {/* Trip Type & Class */}
                <View style={styles.row}>
                  <MenuButton
                    text={tripType.label}
                    items={TripTypes}
                    onItemSelected={onTripTypeSelected}
                  />
                  <View style={styles.spacer} />
                  <MenuButton
                    text={cabinClass.label}
                    items={CabinClasses}
                    onItemSelected={onCabinClassSelected}
                  />
                </View>

                {/* From & To */}
                <View style={styles.section}>
                  <View style={styles.row}>
                    <TextFieldButton
                      placeholder="From"
                      label="From"
                      value={fromAirport?.presentation.title}
                      onPress={onPressFromAirport}
                      left={
                        <TextInput.Icon
                          icon="airplane-takeoff"
                          size={24}
                          onPress={onPressFromAirport}
                        />
                      }
                    />
                    <IconButton
                      icon="arrow-left-right"
                      size={20}
                      style={styles.swapButton}
                      onPress={onAirportSwap}
                    />
                    <TextFieldButton
                      placeholder="Where To"
                      label="Where To"
                      value={toAirport?.presentation.title}
                      onPress={onPressToAirport}
                      left={
                        <TextInput.Icon
                          icon="airplane-landing"
                          size={24}
                          onPress={onPressToAirport}
                        />
                      }
                    />
                  </View>
                </View>

                {/* Departure & Return */}
                <View style={styles.section}>
                  <View style={styles.row}>
                    <TextFieldButton
                      placeholder="Departure"
                      label="Departure"
                      value={
                        departureDate &&
                        DateTime.fromJSDate(departureDate).toFormat(
                          "d MMM yyyy"
                        )
                      }
                      onPress={onPressDepartureDate}
                      left={
                        <TextInput.Icon icon="calendar-arrow-right" size={24} />
                      }
                    />
                    {
                      // Show Return Date only if trip type is Round Trip
                      tripType.value === "round_trip" && (
                        <>
                          <View style={styles.spacer} />
                          <TextFieldButton
                            placeholder="Return"
                            label="Return"
                            value={
                              returnDate &&
                              DateTime.fromJSDate(returnDate).toFormat(
                                "d MMM yyyy"
                              )
                            }
                            onPress={onPressReturnDate}
                            left={
                              <TextInput.Icon
                                icon="calendar-arrow-left"
                                size={24}
                              />
                            }
                          />
                        </>
                      )
                    }
                  </View>
                </View>

                {/* Explore Button */}
                <Button
                  icon="magnify"
                  mode="contained"
                  style={styles.exploreButton}
                  disabled={exploreDisabled}
                  onPress={onPressExplore}
                  loading={isLoading}
                >
                  Explore
                </Button>
              </Card.Content>
            </Card>
          );
        }}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <ActivityIndicator animating={isLoading} size="large" />
          </View>
        )}
      />

      <AirportPickerDialog
        onAirportSelected={onAirportSelected}
        visible={airportPickerFor !== undefined}
        onDismiss={dismissAirportPicker}
      />

      <ItineraryDetailsDialog
        itineraryItem={selectedFlight}
        onDismiss={clearSelectedFlight}
      />

      <DatePickerModal
        locale="en"
        mode="single"
        visible={datePickerFor !== undefined}
        onDismiss={dismissDatePicker}
        date={datePickerFor === "departure" ? departureDate : returnDate}
        onConfirm={onDateSelected}
        validRange={
          datePickerFor === "departure"
            ? getDepartureDateRanges()
            : getReturnDateRanges()
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    height: 200,
    overflow: "hidden",
  },
  heroText: {
    position: "absolute",
    bottom: 25,
    alignSelf: "center",
  },
  card: {
    margin: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  spacer: {
    width: 50,
  },
  section: {
    marginTop: 16,
  },
  swapButton: {
    borderWidth: 1,
    borderColor: "#CBCBCB",
    margin: 8,
    marginTop: 12,
  },
  exploreButton: {
    flex: 1,
    marginTop: 12,
  },
  footer: {
    height: "90%",
    justifyContent: "center",
  },
});
