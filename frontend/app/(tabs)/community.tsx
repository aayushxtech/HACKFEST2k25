import React from "react";
import { useState, useEffect } from "react";
import { imageApi } from "../../services/apiClient";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { MotiView } from "moti";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProfileButton from '../components/ProfileButton';

type RootStackParamList = {
  Profile: undefined;
  Community: undefined;
  // Add other screens here
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const events = [
  {
    id: 1,
    name: "Tech Innovators Meetup",
    description:
      "Join fellow developers and tech enthusiasts for an evening of innovation and networking.",
    time: "6:00 PM - 9:00 PM, March 15, 2024",
    type: "Networking",
    location: "The Westin Chennai Velachery",
    imageId: "tech-meetup-1",
    imageUrl: "https://example.com/images/tech-meetup-1.jpg",
  },
  {
    id: 2,
    name: "AI/ML Workshop",
    description:
      "Hands-on workshop on implementing machine learning models in real-world applications.",
    time: "10:00 AM - 4:00 PM, March 20, 2024",
    type: "Workshop",
    location: "IIT Madras Research Park",
    imageId: "ai-workshop-2",
    imageUrl: "https://example.com/images/ai-workshop-2.jpg",
  },
  {
    id: 3,
    name: "Startup Pitch Night",
    description:
      "Watch innovative startups pitch their ideas to investors and industry experts.",
    time: "5:00 PM - 8:00 PM, March 25, 2024",
    type: "Pitch Event",
    location: "Chennai Innovation Hub, Taramani",
    imageId: "startup-pitch-3",
    imageUrl: "https://example.com/images/startup-pitch-3.jpg",
  },
  {
    id: 4,
    name: "Blockchain Conference",
    description:
      "Explore the latest trends and developments in blockchain technology.",
    time: "9:00 AM - 5:00 PM, April 5, 2024",
    type: "Conference",
    location: "Hyatt Regency Chennai",
    imageId: "blockchain-conference-4",
    imageUrl: "https://example.com/images/blockchain-conference-4.jpg",
  },
  {
    id: 5,
    name: "Cybersecurity Summit",
    description:
      "Learn about the latest cybersecurity threats and how to protect against them.",
    time: "10:00 AM - 3:00 PM, April 10, 2024",
    type: "Summit",
    location: "Taj Coromandel, Chennai",
    imageId: "cybersecurity-summit-5",
    imageUrl: "https://example.com/images/cybersecurity-summit-5.jpg",
  },
  {
    id: 6,
    name: "Cloud Computing Expo",
    description:
      "Discover the future of cloud computing and its impact on businesses.",
    time: "11:00 AM - 6:00 PM, April 15, 2024",
    type: "Expo",
    location: "Chennai Trade Centre",
    imageId: "cloud-computing-expo-6",
    imageUrl: "https://example.com/images/cloud-computing-expo-6.jpg",
  },
  {
    id: 7,
    name: "IoT Hackathon",
    description:
      "Participate in a hackathon focused on building innovative IoT solutions.",
    time: "9:00 AM - 9:00 PM, April 20, 2024",
    type: "Hackathon",
    location: "Anna University, Chennai",
    imageId: "iot-hackathon-7",
    imageUrl: "https://example.com/images/iot-hackathon-7.jpg",
  },
  {
    id: 8,
    name: "Data Science Bootcamp",
    description:
      "Intensive bootcamp on data science and machine learning techniques.",
    time: "8:00 AM - 6:00 PM, April 25, 2024",
    type: "Bootcamp",
    location: "SRM Institute of Science and Technology",
    imageId: "data-science-bootcamp-8",
    imageUrl: "https://example.com/images/data-science-bootcamp-8.jpg",
  },
  {
    id: 9,
    name: "AR/VR Expo",
    description:
      "Experience the latest advancements in augmented and virtual reality.",
    time: "10:00 AM - 5:00 PM, May 1, 2024",
    type: "Expo",
    location: "Phoenix Marketcity, Chennai",
    imageId: "ar-vr-expo-9",
    imageUrl: "https://example.com/images/ar-vr-expo-9.jpg",
  },
  {
    id: 10,
    name: "Fintech Forum",
    description:
      "Discuss the future of financial technology with industry leaders.",
    time: "9:00 AM - 4:00 PM, May 5, 2024",
    type: "Forum",
    location: "ITC Grand Chola, Chennai",
    imageId: "fintech-forum-10",
    imageUrl: "https://example.com/images/fintech-forum-10.jpg",
  },
];

interface Event {
  id: number;
  name: string;
  description: string;
  time: string;
  type: string;
  location: string;
  imageId: string;
  imageUrl?: string;
}

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(event.imageUrl ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 200 }}
      style={styles.cardContainer}
    >
      {isLoading ? (
        <View style={[styles.eventImage, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#2874A6" />
        </View>
      ) : error ? (
        <View style={[styles.eventImage, styles.errorContainer]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.eventImage} />
        )
      )}
      <View style={styles.cardHeader}>
        <Text style={styles.eventName}>{event.name}</Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{event.type}</Text>
        </View>
      </View>

      <Text style={styles.description}>{event.description}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.timeText}>🕒 {event.time}</Text>
        <Text style={styles.locationText}>📍 {event.location}</Text>
      </View>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => alert(`Joined ${event.name}!`)}
      >
        <Text style={styles.joinButtonText}>Join Now</Text>
      </TouchableOpacity>
    </MotiView>
  );
};

const HostEventForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    date: "",
    time: "",
    poster: null as string | null,
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setEventData((prev) => ({
        ...prev,
        poster: result.assets[0].uri,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Event Data:", eventData);
    // Add submission logic here
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Host Events</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter event name"
          value={eventData.eventName}
          onChangeText={(text) =>
            setEventData({ ...eventData, eventName: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter event description"
          multiline={true}
          numberOfLines={4}
          value={eventData.description}
          onChangeText={(text) =>
            setEventData({ ...eventData, description: text })
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="MM/DD/YYYY"
          value={eventData.date}
          onChangeText={(text) => setEventData({ ...eventData, date: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          value={eventData.time}
          onChangeText={(text) => setEventData({ ...eventData, time: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Event Poster</Text>
        <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
          <Text style={styles.imageUploadButtonText}>
            {eventData.poster ? "Change Poster" : "Upload Poster"}
          </Text>
        </TouchableOpacity>
        {eventData.poster && (
          <Image
            source={{ uri: eventData.poster }}
            style={styles.posterPreview}
          />
        )}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const CommunityTab = () => {
  const [showHostEvent, setShowHostEvent] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const toggleHostEvent = () => {
    setShowHostEvent(!showHostEvent);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Community Events</Text>
        <ProfileButton />
      </View>
      <ScrollView style={styles.scrollView}>
        {showHostEvent ? (
          <HostEventForm />
        ) : (
          events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))
        )}
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={toggleHostEvent}>
        <Text style={styles.fabText}>{showHostEvent ? "×" : "+"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    paddingTop: Platform.OS === "ios" ? 35 : 10, // Reduced top padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: "#2874A6",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 20, // Added top margin
    marginBottom: 12, // Adjusted bottom margin
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  headerText: {
    fontSize: 24, // Reduced from 28
    fontWeight: "700", // Changed from "bold"
    color: "white",
    textAlign: "center",
    letterSpacing: 0.5, // Added letter spacing
  },
  profileButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  profileButtonText: {
    color: "#2874A6",
    fontWeight: "bold",
  },
  scrollView: {
    padding: 12, // Changed from 15
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2874A6",
    flex: 1,
  },
  typeBadge: {
    backgroundColor: "#E1F5FE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: "#0277BD",
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  detailsContainer: {
    marginBottom: 15,
  },
  timeText: {
    color: "#555",
    marginBottom: 5,
  },
  locationText: {
    color: "#555",
  },
  joinButton: {
    backgroundColor: "#2874A6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fee",
  },
  errorText: {
    color: "#e66",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2874A6",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#2874A6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2874A6",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 1000,
  },
  fabText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  imageUploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginBottom: 10,
  },
  imageUploadButtonText: {
    color: "#2874A6",
    fontSize: 16,
    fontWeight: "600",
  },
  posterPreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    resizeMode: "cover",
  },
});

export default CommunityTab;
