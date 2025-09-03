import { useMemo } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "react-native-paper";

export interface AppContainerProps {
  children: React.ReactNode;
}

const DESKTOP_MIN_WIDTH = 500 as const;

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const { surfaceVariant, background } = useTheme().colors;
  const { width } = useWindowDimensions();

  const isWebLargeScreen = Platform.OS === "web" && width > DESKTOP_MIN_WIDTH;

  const containerStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      flex: 1,
      alignItems: "center",
      backgroundColor: background,
    }),
    [background]
  );

  const contentStyle: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.content,
      {
        borderColor: surfaceVariant,
        maxWidth: DESKTOP_MIN_WIDTH,
      },
    ],
    [surfaceVariant]
  );

  if (isWebLargeScreen) {
    return (
      <View style={containerStyle}>
        <View style={contentStyle}>{children}</View>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 18,
    marginVertical: 12,
    width: "100%",
    overflow: "hidden",
  },
});

export { AppContainer };
