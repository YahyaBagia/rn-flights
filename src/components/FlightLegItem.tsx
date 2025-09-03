import { StyleSheet, View } from "react-native";
import { Avatar, Text, TouchableRipple } from "react-native-paper";
import Utils from "../common/Utils";
import { FlightLeg } from "../types";
import { FlightLegPointItem } from "./FlightLegPointItem";
import { FlightStopsIndicator } from "./FlightStopsIndicator";

interface IFlightLegItemProps {
  leg: FlightLeg;
  onPress?: (leg: FlightLeg) => void;
}

const FlightLegItem: React.FC<IFlightLegItemProps> = ({ leg, onPress }) => {
  const {
    departure,
    arrival,
    durationInMinutes,
    origin,
    destination,
    stopCount,
    carriers,
  } = leg;

  const marketing = carriers?.marketing?.[0];

  const stopsColor =
    stopCount === 0 ? "#2E7D32" : stopCount === 1 ? "#F57C00" : "#C62828";

  return (
    <TouchableRipple onPress={onPress ? () => onPress(leg) : undefined}>
      <View style={styles.legContainer}>
        {marketing?.logoUrl && (
          <View style={styles.logoContainer}>
            <Avatar.Image
              source={{ uri: marketing.logoUrl }}
              size={50}
              style={styles.logo}
            />
          </View>
        )}

        <View style={styles.legDetails}>
          <FlightLegPointItem dateTime={departure} flightPlace={origin} />

          <View>
            <Text variant="labelMedium" style={styles.centerText}>
              {Utils.formatDuration(durationInMinutes)}
            </Text>

            <FlightStopsIndicator
              stopCount={stopCount}
              indicatorColor={stopsColor}
            />

            <Text
              variant="labelMedium"
              style={[styles.centerText, { color: stopsColor }]}
            >
              {stopCount > 0
                ? `${stopCount} Stop${stopCount > 1 ? "s" : ""}`
                : "Direct"}
            </Text>
          </View>

          <FlightLegPointItem dateTime={arrival} flightPlace={destination} />
        </View>
      </View>
    </TouchableRipple>
  );
};

// Styles
const styles = StyleSheet.create({
  legContainer: {
    flexDirection: "row",
    marginBottom: 18,
  },
  logoContainer: {
    flex: 0.5,
  },
  logo: {
    marginRight: 8,
  },
  legDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  centerText: {
    textAlign: "center",
  },
});

export { FlightLegItem };
