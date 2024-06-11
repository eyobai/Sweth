import React, { useEffect, useState } from 'react';
import { WEATHER_API_KEY } from '@env';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import WeatherDetails from '../components/WeatherDetails';
import ForecastList from '../components/ForecastList';

interface Props {
  route: any;
  navigation: any;
}

const WeatherScreen: React.FC<Props> = ({ route, navigation }) => {
  const { city } = route.params;
  const [weatherData, setWeatherData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data and forecast data when the component mounts or when the city changes
  useEffect(() => {
    fetchWeatherData(city);
    fetchForecastData(city);
  }, [city]);

  // Fetch the current weather data for the specified city
  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching weather data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the weather forecast data for the specified city
  const fetchForecastData = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${WEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setForecastData(data.list);
    } catch (error: any) {
      console.error('Error fetching forecast data:', error);
      setError(error.message);
    }
  };

  // Show a loading spinner while the data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Handle the "Try Again" button press by navigating back
  const handleTryAgain = () => {
    navigation.goBack();
  };

  // Show an error message if the weather data is not available or if there was an error
  if (!weatherData || weatherData.cod !== 200) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>City not found</Text>
        <Text style={styles.errorSubText}>{error}</Text>
        <TouchableOpacity onPress={handleTryAgain} style={styles.tryAgainButton}>
          <Text style={styles.tryAgainText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render the weather and forecast data
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../asset/backround.png')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} size={24} color="white" />
          </TouchableOpacity>
          <WeatherDetails city={city} main={weatherData.main} weather={weatherData.weather} />
          <ForecastList forecastData={forecastData} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
    color: 'red',
    marginBottom: 10,
  },
  errorSubText: {
    fontSize: 16,
    color: 'red',
  },
  tryAgainButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  tryAgainText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WeatherScreen;
