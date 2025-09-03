import { createMaterial3Theme } from "@pchmn/expo-material3-theme";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import {
  adaptNavigationTheme,
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LightTheme,
  MD3Theme,
} from "react-native-paper";

import { AppThemeColor } from "@/src/common/Constants";
import { useEffect } from "react";
import { useAuthStore } from "../store/globalStore";

const useLayoutController = () => {
  const { initialize } = useAuthStore();
  useEffect(() => {
    initialize();
  }, [initialize]);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const theme = isDarkMode ? DarkTheme : LightTheme;

  const generatedTheme = createMaterial3Theme(AppThemeColor);
  const colors = { ...generatedTheme[isDarkMode ? "dark" : "light"] };

  const paperTheme: MD3Theme = { ...theme, colors, dark: isDarkMode };

  const { LightTheme: lightNavTheme, DarkTheme: darkNavTheme } =
    adaptNavigationTheme({
      reactNavigationLight: NavigationDefaultTheme,
      reactNavigationDark: NavigationDarkTheme,
      materialDark: paperTheme,
      materialLight: paperTheme,
    });

  const navigationTheme: any = isDarkMode ? darkNavTheme : lightNavTheme;

  return {
    paperTheme,
    navigationTheme,
  };
};

export { useLayoutController };
