import {
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
  Dimensions,
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import Animated, { FadeInDown } from 'react-native-reanimated';

interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  image: any;
}

const CARDS: CardItem[] = [
  {
    id: 'community',
    title: 'Community',
    subtitle: 'Connect with volunteers',
    icon: 'people-outline',
    image: require("../../assets/images/community.jpg")
  },
  {
    id: 'city',
    title: 'City',
    subtitle: 'Discover local initiatives',
    icon: 'location-outline',
    image: require("../../assets/images/city.jpg")
  },
  {
    id: 'donations',
    title: 'Donations',
    subtitle: 'Make a difference',
    icon: 'gift-outline',
    image: require("../../assets/images/donations.jpg")
  },
  {
    id: 'services',
    title: 'Services',
    subtitle: 'Find local services',
    icon: 'calendar-outline',
    image: require("../../assets/images/upcoming.jpg")
  }
];

export default function TabOneScreen() {
  const { width } = useWindowDimensions();
  const isSmallDevice = width < 375;
  const padding = isSmallDevice ? 16 : 24;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNavigate = (route: string) => {
    try {
      setIsLoading(true);
      router.push(`/(tabs)/${route}`);
    } catch (err) {
      console.error('Navigation error:', err);
      setError('Navigation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => setError(null)}
          >
            <ThemedText style={styles.retryText}>Retry</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      <View style={styles.mainContainer}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent, 
            { padding }
          ]}
        >
          <View style={styles.headerContainer}>
            <ThemedText style={styles.welcomeText}>
              Welcome Back 👋
            </ThemedText>
            <ThemedText style={styles.subtitleText}>
              Explore services in your area
            </ThemedText>
          </View>

          <View style={styles.cardGrid}>
            {CARDS.map((item) => (
              <Animated.View
                key={item.id}
                entering={FadeInDown.delay(200)}
                style={styles.card}
              >
                <TouchableOpacity
                  onPress={() => handleNavigate(item.id)}
                  style={styles.cardTouchable}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={item.image}
                      style={styles.cardImage}
                    />
                    <View style={styles.cardOverlay} />
                  </View>
                  <View style={styles.cardContent}>
                    <View style={styles.iconContainer}>
                      <Ionicons 
                        name={item.icon as any} 
                        size={20} // Changed from 28 to 24
                        color="#1A365D" 
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <ThemedText style={styles.cardTitle}>
                        {item.title}
                      </ThemedText>
                      <ThemedText style={styles.cardSubtext}>
                        {item.subtitle}
                      </ThemedText>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A365D",
    marginBottom: 12,
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  subtitleText: {
    fontSize: 16,
    color: "#4A5568",
    fontWeight: "500",
  },
  cardGrid: {
    gap: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    height: 180,
  },
  cardTouchable: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    width: '40%',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconContainer: {
    width: 48, // Changed from 48
    height: 48, // Changed from 48
    borderRadius: 24, // Changed from 24
    backgroundColor: '#F0F7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18, // Changed from 20
    fontWeight: "700",
    color: "#1A365D",
    marginBottom: 4,
    textAlign: "center",
  },
  cardSubtext: {
    fontSize: 12, // Changed from 14
    color: "#4A5568",
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 16, // Changed from 20
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
