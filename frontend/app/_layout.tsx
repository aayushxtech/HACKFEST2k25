import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isLoading, isSignedIn } = useAuth();
  const colorScheme = useColorScheme();

  if (isLoading) {
    return null;
  }

  try {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          {!isSignedIn ? (
            <>
              <Stack.Screen name="auth/login" />
              <Stack.Screen name="auth/signup" />
            </>
          ) : (
            <>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="+not-found" />
            </>
          )}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    );
  } catch (error) {
    console.error("Root Layout Error:", error);
    return null;
  }
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
