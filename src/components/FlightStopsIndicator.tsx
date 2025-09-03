import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

interface IFlightStopsIndicatorProps {
  stopCount: number;
  indicatorColor: string;
}

const FlightStopsIndicator: React.FC<IFlightStopsIndicatorProps> = ({
  stopCount,
  indicatorColor,
}) => {
  return (
    <View style={styles.stopsWrapper}>
      <Divider style={styles.dividerLine} />
      <View style={styles.stopDotsWrapper}>
        {Array.from({ length: stopCount }).map((_, index) => (
          <View
            key={index}
            style={[styles.stopDot, { backgroundColor: indicatorColor }]}
          />
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  stopsWrapper: {
    marginVertical: 4,
  },
  dividerLine: {
    height: 2,
    width: "100%",
  },
  stopDotsWrapper: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    top: -4,
  },
  stopDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export { FlightStopsIndicator };
