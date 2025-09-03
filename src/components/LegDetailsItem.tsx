import { DateTime } from "luxon";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import Utils from "../common/Utils";
import { FlightLeg } from "../types";

export interface ILegDetailsItemProps {
  leg: FlightLeg;
}

const LegDetailsItem: React.FC<ILegDetailsItemProps> = ({ leg }) => {
  const {
    departure,
    arrival,
    durationInMinutes,
    origin,
    destination,
    carriers,
  } = leg;

  const airlineName = carriers.marketing[0]?.name ?? "Unknown Airline";

  const departureTime = DateTime.fromISO(departure).toFormat("HH:mm");
  const arrivalTime = DateTime.fromISO(arrival).toFormat("HH:mm");
  const departureDate = DateTime.fromISO(departure).toFormat("ccc, d MMM yyyy");
  const arrivalDate = DateTime.fromISO(arrival).toFormat("ccc, d MMM yyyy");

  const formattedDuration = Utils.formatDuration(durationInMinutes);

  return (
    <View>
      <Divider style={styles.sectionDivider} />

      <Text variant="titleMedium">{airlineName}</Text>

      {/* Departure */}
      <View style={styles.row}>
        <Text variant="titleLarge">{departureTime}</Text>
        <Text variant="titleMedium" style={styles.locationText}>
          {origin.displayCode} {origin.city}
        </Text>
      </View>

      {/* Duration + route */}
      <View style={styles.row}>
        <Text variant="titleSmall">{formattedDuration}</Text>
        <Text variant="titleSmall" style={styles.routeText}>
          {origin.name}
          {"\n\n"}
          {destination.name}
        </Text>
      </View>

      {/* Arrival */}
      <View style={styles.row}>
        <Text variant="titleLarge">{arrivalTime}</Text>
        <Text variant="titleMedium" style={styles.locationText}>
          {destination.displayCode} {destination.city}
        </Text>
      </View>

      <Divider style={styles.dateDivider} />

      {/* Dates */}
      <View>
        <Text variant="titleSmall">Depart: {departureDate}</Text>
        <Text variant="titleSmall">Return: {arrivalDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionDivider: {
    marginBottom: 12,
  },
  dateDivider: {
    marginVertical: 12,
  },
  locationText: {
    marginLeft: 12,
  },
  routeText: {
    marginLeft: 12,
  },
});

export { LegDetailsItem };
