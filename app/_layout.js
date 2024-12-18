import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "@/components/header-footer/header";
import { PaperProvider } from "react-native-paper";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/TiroBangla-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Header />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#FFF" },
            headerTintColor: "#0f172a",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="teachers" options={{ title: "শিক্ষকবৃন্দ" }} />
          <Stack.Screen
            name="students"
            options={{ title: "শিক্ষার্থী তথ্য" }}
          />
          <Stack.Screen name="results" options={{ title: "পরীক্ষার ফলাফল" }} />
          <Stack.Screen name="about" options={{ title: "মাদ্রাসা পরিচিতি" }} />
          <Stack.Screen
            name="class-list"
            options={{ title: "ক্লাস সিলেক্ট করুন" }}
          />
          <Stack.Screen
            name="results-list"
            options={{ title: "ক্লাস সিলেক্ট করুন" }}
          />
          <Stack.Screen name="opinion" options={{ title: "মতামত দিন" }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <StatusBar backgroundColor="#C5DEFE" translucent={false} style="dark" />
      </ThemeProvider>
    </PaperProvider>
  );
}
