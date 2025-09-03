import { DateTime } from "luxon";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { FlightPlace } from "../types";

interface IFlightLegPointItemProps {
  dateTime: string;
  flightPlace: FlightPlace;
}

export const FlightLegPointItem: React.FC<IFlightLegPointItemProps> = ({
  dateTime,
  flightPlace,
}) => {
  const time = DateTime.fromISO(dateTime).toFormat("HH:mm");

  return (
    <View>
      <Text variant="titleMedium" style={styles.centerText}>
        {time}
      </Text>
      <Text variant="titleSmall" style={styles.centerText}>
        {flightPlace.displayCode}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    textAlign: "center",
  },
});
