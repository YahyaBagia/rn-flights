import { StyleSheet } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

import { IItinerarySearchItem } from "../types";
import { FlightLegItem } from "./FlightLegItem";

// Props
export interface IFlightItemProps {
  flightItem: IItinerarySearchItem;
  onPress: (flightItem: IItinerarySearchItem) => void;
}

const FlightItem: React.FC<IFlightItemProps> = ({ flightItem, onPress }) => {
  const { price, legs } = flightItem;

  return (
    <Card onPress={() => onPress(flightItem)} style={styles.card}>
      <Card.Content>
        {legs.map((leg, index) => (
          <FlightLegItem key={leg.id ?? index} leg={leg} />
        ))}
        <Divider style={styles.divider} />
        <Text variant="titleLarge" style={styles.price}>
          {price.formatted}
        </Text>
      </Card.Content>
    </Card>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  divider: {
    marginVertical: 18,
    height: 2,
  },
  price: {
    textAlign: "right",
  },
});

export { FlightItem };
