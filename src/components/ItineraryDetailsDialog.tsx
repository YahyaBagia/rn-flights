import { useState } from "react";
import { View } from "react-native";
import { Button, Card, Dialog, Portal } from "react-native-paper";
import { IItinerarySearchItem } from "../types";
import { FlightLegItem } from "./FlightLegItem";
import { LegDetailsItem } from "./LegDetailsItem";

export interface IItineraryDetailsDialogProps {
  itineraryItem?: IItinerarySearchItem;
  onDismiss: () => void;
}

const ItineraryDetailsDialog: React.FC<IItineraryDetailsDialogProps> = ({
  itineraryItem,
  onDismiss,
}) => {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  if (!itineraryItem) return null;
  const { price, legs } = itineraryItem;

  const onPressLeg = (index: number) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  return (
    <Portal>
      <Dialog visible={!!itineraryItem} onDismiss={onDismiss}>
        <Dialog.Title>Itinerary Details</Dialog.Title>
        <Dialog.ScrollArea>
          <View>
            {legs.map((leg, index) => (
              <Card key={leg.id ?? index} style={{ marginVertical: 12 }}>
                <Card.Content>
                  <FlightLegItem leg={leg} onPress={() => onPressLeg(index)} />
                  {expandedIndexes.includes(index) && (
                    <LegDetailsItem leg={leg} />
                  )}
                </Card.Content>
              </Card>
            ))}
          </View>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button mode="contained" onPress={onDismiss}>
            Book Now for just {price.formatted}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export { ItineraryDetailsDialog };
