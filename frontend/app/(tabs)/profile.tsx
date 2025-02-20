import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";

interface UserDetails {
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
}

interface CIIDetails {
  score: number;
  rank: number;
  badge: string;
  badgeImage: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

// Add this helper function before the ProfileScreen component
const getScoreColor = (score: number): string => {
  return score > 500 ? "#FFD700" : "#C0C0C0"; // Gold for >500, Silver for ≤500
};

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: "Mahesh Babu",
    email: "mahesh@gmail.com",
    bio: "Software Developer | Event Enthusiast",
    profilePicture: "https://via.placeholder.com/150", // Fixed URL
  });

  const [editableDetails, setEditableDetails] = useState({ ...userDetails });

  const handleSave = () => {
    setUserDetails(editableDetails);
    setIsEditing(false);
  };

  const [joinedEvents] = useState<Event[]>([
    { id: 1, name: "Tech Conference 2025", date: "2025-03-15" },
    { id: 2, name: "Hackathon 2025", date: "2025-04-01" },
  ]);

  const [hostedEvents] = useState<Event[]>([
    { id: 1, name: "Code Workshop", date: "2025-03-20" },
  ]);

  const [ciiDetails] = useState<CIIDetails>({
    score: 850,
    rank: 5,
    badge: "Rookie",
    badgeImage: "https://api.dicebear.com/7.x/bottts/png?seed=rookie", // Changed from svg to png
  });

  const [leaderboardData] = useState<LeaderboardEntry[]>([
    { rank: 1, name: "Rohan Sharma", score: 980 },
    { rank: 2, name: "Ram Prakash", score: 925 },
    { rank: 3, name: "Prathik Jain", score: 890 },
    { rank: 4, name: "Anumita Menon", score: 870 },
    { rank: 5, name: "Manikandan", score: 850 },
    { rank: 6, name: "Pavitra", score: 840 },
  ]);

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setUserDetails({
          ...userDetails,
          profilePicture: result.assets[0].uri,
        });
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Failed to pick image");
    }
  };

  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: "Profile" }} />

      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: userDetails.profilePicture }}
                style={styles.profilePicture}
              />
              <View style={styles.editIconOverlay}>
                <Text style={styles.editIconText}>+</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.userInfo, isEditing && styles.editingUserInfo]}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.editInput}
                value={editableDetails.name}
                onChangeText={(text) =>
                  setEditableDetails({ ...editableDetails, name: text })
                }
                placeholder="Name"
              />
              <TextInput
                style={styles.editInput}
                value={editableDetails.email}
                onChangeText={(text) =>
                  setEditableDetails({ ...editableDetails, email: text })
                }
                placeholder="Email"
              />
              <TextInput
                style={styles.editInput}
                value={editableDetails.bio}
                onChangeText={(text) =>
                  setEditableDetails({ ...editableDetails, bio: text })
                }
                placeholder="Bio"
                multiline
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.name}>{userDetails.name}</Text>
              <Text style={styles.email}>{userDetails.email}</Text>
              <Text style={styles.bio}>{userDetails.bio}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* CII Details Section */}
      <View style={styles.ciiSection}>
        <Text style={styles.sectionTitle}>CII Details</Text>

        <View style={styles.ciiContainer}>
          <View style={styles.ciiCard}>
            <Text style={styles.ciiLabel}>CII Score</Text>
            <Text
              style={[
                styles.ciiValue,
                { color: getScoreColor(ciiDetails.score) },
              ]}
            >
              {ciiDetails.score}
            </Text>
          </View>

          <View style={styles.ciiCard}>
            <Text style={styles.ciiLabel}>CII Badge</Text>
            <View style={styles.badgeContainer}>
              <Image
                source={{ uri: ciiDetails.badgeImage }}
                style={styles.badgeImage}
                resizeMode="contain"
              />
              <View style={styles.badgeTextContainer}>
                <Text style={styles.badgeTitle}>Badge Level:</Text>
                <Text style={styles.ciiBadge}>{ciiDetails.badge}</Text>
              </View>
            </View>
          </View>

          <View style={styles.leaderboardCard}>
            <Text style={styles.leaderboardTitle}>CII Leaderboard</Text>
            {leaderboardData.map((entry, index) => (
              <View
                key={entry.rank}
                style={[
                  styles.leaderboardRow,
                  entry.name === "Current User" && styles.highlightedRow,
                ]}
              >
                <Text style={styles.rankText}>#{entry.rank}</Text>
                <Text style={styles.nameText}>{entry.name}</Text>
                <Text
                  style={[
                    styles.scoreText,
                    { color: getScoreColor(entry.score) },
                  ]}
                >
                  {entry.score}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Joined Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Joined Events</Text>
        {joinedEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
          </View>
        ))}
      </View>

      {/* Hosted Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hosted Events</Text>
        {hostedEvents.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
          </View>
        ))}
      </View>

      {/* Inbox Button */}
      <TouchableOpacity style={styles.inboxButton}>
        <Text style={styles.inboxButtonText}>Inbox</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  editIconOverlay: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "#007AFF",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  editIconText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28,
    textAlign: "center",
  },
  userInfo: {
    alignItems: "center",
  },
  editingUserInfo: {
    width: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  bio: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 16,
  },
  editInput: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 16,
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventCard: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
  inboxButton: {
    margin: 20,
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    alignItems: "center",
  },
  inboxButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  ciiSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  ciiContainer: {
    flexDirection: "column",
    gap: 15,
  },
  ciiCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ciiLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  ciiValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  ciiBadge: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8B7355", // Changed to light brown color
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  badgeImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  leaderboardCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  leaderboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  highlightedRow: {
    backgroundColor: "#f0f8ff",
    borderRadius: 5,
  },
  rankText: {
    fontSize: 16,
    fontWeight: "500",
    width: 40,
  },
  nameText: {
    fontSize: 16,
    flex: 1,
    marginHorizontal: 10,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 60,
    textAlign: "right",
  },
  loader: {
    position: "absolute",
    left: 10,
  },
  badgeTextContainer: {
    flexDirection: "column",
  },
  badgeTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});

export default ProfileScreen;
