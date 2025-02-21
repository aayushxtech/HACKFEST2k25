import { Tabs, Redirect } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useAuth } from "@/context/AuthContext";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

const TAB_COLORS = {
  active: "#007AFF",
  inactive: "#8E8E93",
  background: "#FFFFFF",
  border: "#E5E5EA",
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isSignedIn, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return null; // Or a loading spinner
  }

  // Redirect if not authenticated
  if (!isSignedIn) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563EB",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="city"
        options={{
          title: "City",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="donations"
        options={{
          title: "Donations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="gift" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
