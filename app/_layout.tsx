import { AppContainer } from "@/src/components";
import { useLayoutController } from "@/src/controllers/LayoutController";
import { useAuthStore } from "@/src/store/globalStore";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);

export default function RootLayout() {
  const { navigationTheme, paperTheme } = useLayoutController();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={navigationTheme}>
        <PaperProvider theme={paperTheme}>
          <AppContainer>
            <RootNavigator />
            <StatusBar style="light" />
          </AppContainer>
        </PaperProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const RootNavigator = () => {
  const { user } = useAuthStore();
  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(app)/index" />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="user-list" />
        <Stack.Screen name="signup" />
      </Stack.Protected>
    </Stack>
  );
};
