import { Tabs, Redirect } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useAuth } from "@/context/AuthContext";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from '@expo/vector-icons';

const TAB_COLORS = {
  active: '#007AFF',
  inactive: '#8E8E93',
  background: '#FFFFFF',
  border: '#E5E5EA',
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isSignedIn } = useAuth();

  // Add error boundary
  try {
    // Redirect if not authenticated
    if (!isSignedIn) {
      return <Redirect href="/auth/login" />;
    }

    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: TAB_COLORS.active,
          tabBarInactiveTintColor: TAB_COLORS.inactive,
          tabBarStyle: {
            backgroundColor: TAB_COLORS.background,
            borderTopColor: TAB_COLORS.border,
            borderTopWidth: 1,
            elevation: 0,
            height: Platform.OS === 'ios' ? 85 : 60,
            paddingBottom: Platform.OS === 'ios' ? 30 : 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: TAB_COLORS.background,
          },
          headerTitleStyle: {
            color: '#1A1A1A',
            fontWeight: '600',
          },
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
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
  } catch (error) {
    console.error("Tab Layout Error:", error);
    return <Redirect href="/auth/login" />;
  }
}
