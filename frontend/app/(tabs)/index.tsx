import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const username = "John"; // Replace with actual username from auth context

  const handleNavigateToCommunity = () => {
    router.push("/(tabs)/community");
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.greeting}>
          <ThemedText style={styles.greetingText}>
            Hi, {username}! 👋
          </ThemedText>
        </ThemedView>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={32} color="#4A90E2" />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <View style={styles.cardGrid}>
          {/* Community Card with navigation */}
          <TouchableOpacity
            style={styles.card}
            onPress={handleNavigateToCommunity}
          >
            <Image
              source={require("../../assets/images/community.jpg")}
              style={styles.cardImage}
            />
            <ThemedView style={styles.cardContent}>
              <Ionicons name="people-outline" size={32} color="#4A90E2" />
              <ThemedText style={styles.cardTitle}>Community</ThemedText>
              <ThemedText style={styles.cardSubtext}>
                Connect with volunteers
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>

          {/* Donations Card */}
          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../../assets/images/donations.jpg")}
              style={styles.cardImage}
            />
            <ThemedView style={styles.cardContent}>
              <Ionicons name="gift-outline" size={32} color="#4A90E2" />
              <ThemedText style={styles.cardTitle}>Donations</ThemedText>
              <ThemedText style={styles.cardSubtext}>
                Make a difference
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>

          {/* City Events Card */}
          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../../assets/images/city.jpg")}
              style={styles.cardImage}
            />
            <ThemedView style={styles.cardContent}>
              <Ionicons name="location-outline" size={32} color="#4A90E2" />
              <ThemedText style={styles.cardTitle}>City Events</ThemedText>
              <ThemedText style={styles.cardSubtext}>
                Discover local initiatives
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>

          {/* Upcoming Events Card */}
          <TouchableOpacity style={styles.card}>
            <Image
              source={require("../../assets/images/upcoming.jpg")}
              style={styles.cardImage}
            />
            <ThemedView style={styles.cardContent}>
              <Ionicons name="calendar-outline" size={32} color="#4A90E2" />
              <ThemedText style={styles.cardTitle}>Upcoming Events</ThemedText>
              <ThemedText style={styles.cardSubtext}>
                Plan your schedule
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 48,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2E3E5C",
  },
  profileButton: {
    padding: 8,
  },
  cardsContainer: {
    padding: 16,
    paddingBottom: 32, // Add more padding at bottom
  },
  cardGrid: {
    flexDirection: "column", // Change to column for full-width cards
    gap: 16, // Space between cards
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20, // Slightly larger border radius
    padding: 24, // More padding inside cards
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: "100%", // Full width
    marginBottom: 16,
    minHeight: 160, // Minimum height for cards
    overflow: "hidden", // Important for image corners
  },
  cardContent: {
    alignItems: "center",
    gap: 16, // More space between elements
    padding: 8,
  },
  cardTitle: {
    fontSize: 24, // Larger font size
    fontWeight: "700",
    color: "#2E3E5C",
    marginTop: 8,
  },
  cardSubtext: {
    fontSize: 16, // Larger font size
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
  },
  cardImage: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
});
