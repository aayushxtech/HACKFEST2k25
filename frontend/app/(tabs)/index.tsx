import {
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");
const standardWidth = 375; // iPhone X width as base
const scaleFactor = width / standardWidth;

export default function TabOneScreen() {
  const handleNavigateToCommunity = () => {
    router.push("/(tabs)/community");
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.greeting}>
          <ThemedText style={styles.greetingText}>Hi, John! 👋</ThemedText>
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
    padding: 16 * scaleFactor,
    paddingTop: Platform.OS === "ios" ? 48 * scaleFactor : 16 * scaleFactor,
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
    width: "100%",
  },
  greeting: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 4 * scaleFactor,
  },
  greetingText: {
    fontSize: Math.min(24 * scaleFactor, 32),
    fontWeight: "600",
    color: "#2E3E5C",
    backgroundColor: "transparent",
  },
  profileButton: {
    padding: 8 * scaleFactor,
    backgroundColor: "transparent",
  },
  cardsContainer: {
    padding: 16 * scaleFactor,
    paddingBottom: 32 * scaleFactor,
  },
  cardGrid: {
    flexDirection: "column",
    gap: 16 * scaleFactor,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16 * scaleFactor,
    ...Platform.select({
      ios: {
        shadowColor: "#4A90E2",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
    width: "100%",
    marginBottom: 16 * scaleFactor,
    minHeight: Math.min(160 * scaleFactor, 200),
    overflow: "hidden",
  },
  cardContent: {
    alignItems: "center",
    marginVertical: 8 * scaleFactor,
    backgroundColor: "white", // Add explicit background color
    width: "100%",
    paddingHorizontal: 8 * scaleFactor,
    paddingVertical: 12 * scaleFactor,
  },
  cardTitle: {
    fontSize: Math.min(22 * scaleFactor, 28),
    fontWeight: "700",
    color: "#2E3E5C",
    marginTop: 8 * scaleFactor,
    marginBottom: 4 * scaleFactor,
  },
  cardSubtext: {
    fontSize: Math.min(16 * scaleFactor, 20),
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24 * scaleFactor,
  },
  cardImage: {
    width: "100%",
    height: Math.min(120 * scaleFactor, 150),
    resizeMode: "cover",
    marginBottom: 8 * scaleFactor, // Add space between image and content
  },
});
