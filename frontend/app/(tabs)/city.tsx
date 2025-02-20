import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
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

const API_TIMEOUT = 10000; // 10 seconds

const CityTab = ({ navigation }: { navigation: NativeStackNavigationProp<any> }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [newsError, setNewsError] = useState<string | null>(null);

  const fetchWithTimeout = async (url: string, options = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      return response;
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setWeatherError(null);
      setNewsError(null);
      
      const [weatherRes, newsRes] = await Promise.all([
        fetchWithTimeout(WEATHER_API_URL).catch(err => {
          setWeatherError('Weather data unavailable');
          return null;
        }),
        fetchWithTimeout(NEWS_API_URL).catch(err => {
          setNewsError('News feed unavailable');
          return null;
        })
      ]);

      if (weatherRes) {
        const weatherData = await weatherRes.json();
        setWeather({
          temperature: Number(weatherData.current.temp_c) || 0,
          description: String(weatherData.current.condition.text) || 'Unknown',
          humidity: Number(weatherData.current.humidity) || 0,
          windSpeed: Number(weatherData.current.wind_kph) || 0
        });
      }

      if (newsRes) {
        const newsData = await newsRes.json();
        if (Array.isArray(newsData.articles)) {
          setNews(newsData.articles.map((article: any, index: number) => ({
            id: String(index),
            title: String(article.title || 'No Title'),
            description: String(article.description || 'No Description Available')
          })));
        }
      }
    } catch (err) {
      console.error('Data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const retryFetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={retryFetch} />
        }
      >
        {weatherError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{weatherError}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={retryFetch}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          weather && (
            <Animated.View 
              entering={FadeInDown.delay(300)} 
              style={styles.weatherContainer}
            >
              <View style={styles.weatherHeader}>
                <Text style={styles.sectionTitle}>Today's Weather</Text>
                <Text style={styles.locationText}>Chennai</Text>
              </View>
              <View style={styles.weatherContent}>
                <Text style={styles.temperature}>{weather.temperature}°</Text>
                <Text style={styles.weatherDescription}>{weather.description}</Text>
                <View style={styles.weatherDetails}>
                  <View style={styles.weatherDetail}>
                    <Text style={styles.weatherDetailLabel}>Humidity</Text>
                    <Text style={styles.weatherDetailValue}>{weather.humidity}%</Text>
                  </View>
                  <View style={styles.weatherDetail}>
                    <Text style={styles.weatherDetailLabel}>Wind Speed</Text>
                    <Text style={styles.weatherDetailValue}>{weather.windSpeed} km/h</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          )
        )}

        {newsError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{newsError}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={retryFetch}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.newsSection}>
            <Text style={styles.sectionTitle}>Local Updates</Text>
            {news.map((item, index) => (
              <Animated.View 
                key={item.id}
                entering={FadeInDown.delay(400 + index * 100)}
                style={styles.newsCard}
              >
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{item.title}</Text>
                  <Text style={styles.newsDescription}>{item.description}</Text>
                </View>
              </Animated.View>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('PublicTransport')}
      >
        <Text style={styles.buttonEmoji}>🚌</Text>
        <Text style={styles.floatingButtonText}>Find Transport</Text>
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
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '600',
  },
  weatherContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '700',
    color: '#1A365D',
    letterSpacing: -2,
  },
  weatherDescription: {
    fontSize: 20,
    color: '#4A5568',
    marginVertical: 8,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  weatherDetail: {
    alignItems: 'center',
  },
  weatherDetailLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  weatherDetailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  newsSection: {
    marginBottom: 80,
  },
  newsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  newsContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A365D',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsDescription: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 22,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    backgroundColor: '#3182CE',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  buttonEmoji: {
    fontSize: 20,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    marginBottom: 8,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default CityTab;
