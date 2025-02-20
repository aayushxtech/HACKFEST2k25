import { useState, useEffect } from "react";
import { imageApi } from "../../services/apiClient";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";

const events = [
  {
    id: 1,
    name: "Tech Innovators Meetup",
    description:
      "Join fellow developers and tech enthusiasts for an evening of innovation and networking.",
    time: "6:00 PM - 9:00 PM, March 15, 2024",
    type: "Networking",
    location: "The Westin Chennai Velachery",
    imageId: "tech-meetup-1", // Reference to image in the backend
  },
  {
    id: 2,
    name: "AI/ML Workshop",
    description:
      "Hands-on workshop on implementing machine learning models in real-world applications.",
    time: "10:00 AM - 4:00 PM, March 20, 2024",
    type: "Workshop",
    location: "IIT Madras Research Park",
    imageId: "ai-workshop-2", // Reference to image in the backend
  },
  {
    id: 3,
    name: "Startup Pitch Night",
    description:
      "Watch innovative startups pitch their ideas to investors and industry experts.",
    time: "5:00 PM - 8:00 PM, March 25, 2024",
    type: "Pitch Event",
    location: "Chennai Innovation Hub, Taramani",
    imageId: "startup-pitch-3", // Reference to image in the backend
  },
  // ...Add 7 more events with similar structure
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url = await imageApi.getEventImage(event.imageId);
        if (isMounted) {
          setImageUrl(url);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to load image");
          console.error("Error loading image:", error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadImage();
    return () => {
      isMounted = false;
    };
  }, [event.imageId]);

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

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 1000 }}
        style={styles.header}
      >
        <Text style={styles.headerText}>Community Events</Text>
      </MotiView>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  header: {
    padding: 20,
    backgroundColor: "#2874A6",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  scrollView: {
    padding: 15,
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
});
