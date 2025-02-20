import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface DonationCard {
  id: string;
  name: string;
  type: "Money" | "Food" | "Books" | "Furniture" | "Volunteer";
  amountNeeded: number;
  amountReceived: number;
  description: string;
  image: string;
}

const donationData: DonationCard[] = [
  {
    id: "1",
    name: "Education for Children",
    type: "Money",
    amountNeeded: 50000,
    amountReceived: 30000,
    description: "Help provide education to underprivileged children",
    image: "https://example.com/education.jpg",
  },
  {
    id: "2",
    name: "Food Drive",
    type: "Food",
    amountNeeded: 1000,
    amountReceived: 450,
    description: "Food packages for homeless shelters",
    image: "https://example.com/food.jpg",
  },
  {
    id: "3",
    name: "Library Project",
    type: "Books",
    amountNeeded: 500,
    amountReceived: 200,
    description: "Collecting books for rural schools",
    image: "https://example.com/books.jpg",
  },
  {
    id: "4",
    name: "Furniture for Shelter",
    type: "Furniture",
    amountNeeded: 20,
    amountReceived: 8,
    description: "Basic furniture needed for homeless shelter",
    image: "https://example.com/furniture.jpg",
  },
  {
    id: "5",
    name: "Teaching Volunteers",
    type: "Volunteer",
    amountNeeded: 50,
    amountReceived: 20,
    description: "Volunteers needed for weekend teaching",
    image: "https://example.com/volunteer.jpg",
  },
];

const DonationScreen = () => {
  const [selectedType, setSelectedType] = useState<string>("All");

  const filterTypes = [
    "All",
    "Money",
    "Food",
    "Books",
    "Furniture",
    "Volunteer",
  ];

  const filteredDonations =
    selectedType === "All"
      ? donationData
      : donationData.filter((item) => item.type === selectedType);

  const getProgressColor = (received: number, needed: number) => {
    const percentage = (received / needed) * 100;
    if (percentage < 30) return "#FF6B6B";
    if (percentage < 70) return "#FFD93D";
    return "#4CAF50";
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <Ionicons
              name="person-circle"
              size={24 * scaleFactor}
              color="#fff"
            />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Donations
          </Text>
        </View>
      </View>

      {/* Filter Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filterTypes.map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedType === type && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.filterText,
                selectedType === type && styles.filterTextActive,
              ]}
            >
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Donation Cards */}
      <ScrollView style={styles.cardsContainer}>
        {filteredDonations.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {item.name}
                </Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{item.type}</Text>
                </View>
              </View>

              <Text numberOfLines={2} style={styles.description}>
                {item.description}
              </Text>

              <View style={styles.progressContainer}>
                <View style={styles.progressInfo}>
                  <Text numberOfLines={1} style={styles.progressText}>
                    Progress: {item.amountReceived}/{item.amountNeeded}
                  </Text>
                  <Text style={styles.progressPercent}>
                    {((item.amountReceived / item.amountNeeded) * 100).toFixed(
                      0
                    )}
                    %
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${
                          (item.amountReceived / item.amountNeeded) * 100
                        }%`,
                        backgroundColor: getProgressColor(
                          item.amountReceived,
                          item.amountNeeded
                        ),
                      },
                    ]}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.donateButton}>
                <Text style={styles.donateButtonText}>Donate Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get("window");
const scaleFactor = width / 375;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F7FF" },
  header: {
    backgroundColor: "#4A90E2",
    height: Platform.OS === "ios" ? 90 : 70,
    justifyContent: "flex-end",
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16 * scaleFactor,
  },
  profileButton: {
    padding: 8 * scaleFactor,
    marginRight: 12 * scaleFactor,
  },
  headerTitle: {
    fontSize: 20 * scaleFactor,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  filterContainer: { padding: 15 * scaleFactor },
  filterButton: {
    paddingHorizontal: 20 * scaleFactor,
    paddingVertical: 10 * scaleFactor,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10 * scaleFactor,
    minWidth: 80,
    alignItems: "center",
  },
  filterButtonActive: { backgroundColor: "#4A90E2" },
  filterText: { color: "#4A90E2", fontWeight: "600" },
  filterTextActive: { color: "#fff" },
  cardsContainer: { padding: 15 * scaleFactor },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15 * scaleFactor,
  },
  cardImage: { width: "100%", height: 150 * scaleFactor },
  cardContent: {
    padding: 12 * scaleFactor,
    gap: 8 * scaleFactor,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4 * scaleFactor,
  },
  cardTitle: {
    fontSize: Math.min(16 * scaleFactor, 18),
    fontWeight: "bold",
    flex: 1,
    marginRight: 8 * scaleFactor,
  },
  typeBadge: {
    backgroundColor: "#E1F5FE",
    paddingHorizontal: 8 * scaleFactor,
    paddingVertical: 4 * scaleFactor,
    borderRadius: 12,
  },
  typeText: {
    color: "#0277BD",
    fontWeight: "600",
    fontSize: Math.min(12 * scaleFactor, 14),
  },
  description: {
    color: "#64748B",
    fontSize: Math.min(13 * scaleFactor, 14),
    lineHeight: Math.min(18 * scaleFactor, 20),
    marginBottom: 8 * scaleFactor,
  },
  progressContainer: {
    marginBottom: 12 * scaleFactor,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    color: "#64748B",
    fontSize: Math.min(13 * scaleFactor, 14),
    flex: 1,
    marginRight: 8 * scaleFactor,
  },
  progressPercent: {
    fontWeight: "bold",
    fontSize: Math.min(13 * scaleFactor, 14),
  },
  progressBar: {
    height: 8 * scaleFactor,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
  progressFill: { height: "100%", borderRadius: 4 },
  donateButton: {
    backgroundColor: "#4CAF50",
    padding: 12 * scaleFactor,
    borderRadius: 8 * scaleFactor,
  },
  donateButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16 * scaleFactor,
  },
});

export default DonationScreen;
