import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Dialog,
  List,
  Portal,
  Searchbar,
  Text,
} from "react-native-paper";
import { searchAirport } from "../services";
import { IAirportSearchItem } from "../types";

export interface IAirportPickerDialogProps {
  visible: boolean;
  onAirportSelected: (airport: IAirportSearchItem) => void;
  onDismiss: () => void;
}

const AirportPickerDialog: React.FC<IAirportPickerDialogProps> = ({
  visible,
  onAirportSelected,
  onDismiss,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IAirportSearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAirports = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchAirport(query);
      setResults(res);
    } catch (error) {
      console.error("Failed to search airports:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query]);

  // debounce search
  useEffect(() => {
    const timeout = setTimeout(loadAirports, 400);
    return () => clearTimeout(timeout);
  }, [query, loadAirports]);

  const handleSelect = (item: IAirportSearchItem) => {
    onAirportSelected(item);
    setQuery("");
    onDismiss();
  };

  const renderEmptyState = () => (
    <Dialog.Content>
      <View style={styles.emptyState}>
        {loading ? (
          <>
            <ActivityIndicator size="large" />
            <Text variant="titleLarge" style={styles.message}>
              Loading...
            </Text>
          </>
        ) : (
          <>
            <Avatar.Icon icon="airplane-marker" size={64} />
            <Text variant="titleLarge" style={styles.message}>
              {query ? "No airports found" : "Search for airports"}
            </Text>
          </>
        )}
      </View>
    </Dialog.Content>
  );

  const renderList = () => (
    <Dialog.ScrollArea>
      <FlatList
        data={results}
        keyExtractor={(item) => item.navigation.entityId}
        renderItem={({ item }) => (
          <List.Item
            title={item.presentation.title}
            description={item.presentation.subtitle}
            onPress={() => handleSelect(item)}
            left={(props) => (
              <List.Icon
                {...props}
                icon={
                  item.navigation.entityType === "AIRPORT"
                    ? "airplane"
                    : "city-variant-outline"
                }
              />
            )}
          />
        )}
        keyboardShouldPersistTaps="handled"
      />
    </Dialog.ScrollArea>
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Search Airports</Dialog.Title>

        <Searchbar
          placeholder="Search airports or cities"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="words"
        />

        {results.length > 0 ? renderList() : renderEmptyState()}

        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    height: 265,
  },
  message: {
    marginTop: 16,
    textAlign: "center",
  },
});

export { AirportPickerDialog };
