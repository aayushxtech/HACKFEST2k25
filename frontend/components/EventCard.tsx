import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MotiView } from "moti";

interface EventCardProps {
  event: {
    name: string;
    description: string;
    date: string;
    time: string;
    imageUrl: string;
  };
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 100 }}
      style={styles.card}
    >
      {event.imageUrl && !imageError ? (
        <Image
          source={{ uri: event.imageUrl }}
          style={styles.image}
          onError={() => setImageError(true)}
        />
      ) : (
        <View style={styles.fallbackImage}>
          <Text style={styles.fallbackText}>No image available</Text>
        </View>
      )}
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.meta}>📅 {event.date}</Text>
        <Text style={styles.meta}>⏰ {event.time}</Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2874A6",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    fontSize: 14,
    color: "#888",
  },
  fallbackImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 12,
  },
  fallbackText: {
    color: "#666",
    fontSize: 14,
  },
});

export default EventCard;
