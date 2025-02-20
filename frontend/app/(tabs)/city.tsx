import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
}

const WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json?key=96adefd6a4d7469ea6a194156252002&q=Chennai&aqi=no';
const NEWS_API_URL = 'https://gnews.io/api/v4/top-headlines?q=Chennai&lang=en&country=in&max=10&apikey=33f2509dcad25b23b6d28f84eb7f6b86';

const CityTab = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      const [weatherRes, newsRes] = await Promise.all([
        fetch(WEATHER_API_URL),
        fetch(NEWS_API_URL)
      ]);

      const weatherData = await weatherRes.json();
      const newsData = await newsRes.json();

      setWeather({
        temperature: weatherData.current.temp_c,
        description: weatherData.current.condition.text,
        humidity: weatherData.current.humidity,
        windSpeed: weatherData.current.wind_kph
      });

      setNews(newsData.articles.map((article: any, index: number) => ({
        id: index.toString(),
        title: article.title || 'No Title',
        description: article.description || 'No Description Available'
      })));
    } catch (err) {
      console.error('Data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {weather && (
          <Animated.View entering={FadeInDown.delay(300)} style={styles.weatherContainer}>
            <Text style={styles.sectionTitle}>Weather</Text>
            <View style={styles.weatherContent}>
              <Text style={styles.temperature}>{weather.temperature}°C</Text>
              <Text style={styles.weatherDescription}>{weather.description}</Text>
              <View style={styles.weatherDetails}>
                <Text>Humidity: {weather.humidity}%</Text>
                <Text>Wind: {weather.windSpeed} km/h</Text>
              </View>
            </View>
          </Animated.View>
        )}

        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>Trending News</Text>
          {news.map((item, index) => (
            <Animated.View 
              key={item.id}
              entering={FadeInDown.delay(400 + index * 100)}
              style={styles.newsCard}
            >
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('PublicTransport')}
      >
        <Text style={styles.buttonEmoji}>🚌</Text>
        <Text style={styles.floatingButtonText}>Transport</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  weatherContent: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  weatherDescription: {
    fontSize: 18,
    color: '#666',
    marginVertical: 8,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  newsSection: {
    marginBottom: 80,
  },
  newsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1A1A',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#666',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    gap: 8,
  },
  floatingButtonText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '600',
  },
  buttonEmoji: {
    fontSize: 20,
  },
});

export default CityTab;
