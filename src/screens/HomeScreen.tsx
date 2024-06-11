import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface Props {
  navigation: {
    navigate: (screen: string, params: { city: string }) => void;
  };
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [city, setCity] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Load search history when the component mounts
  useEffect(() => {
    loadHistory();
  }, []);

  // Load search history from AsyncStorage
  const loadHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem('searchHistory');
      if (historyData) {
        setHistory(JSON.parse(historyData).slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  // Save the current city to search history in AsyncStorage
  const saveHistory = async (newCity: string) => {
    try {
      const updatedHistory = [newCity, ...history.filter(item => item !== newCity)];
      setHistory(updatedHistory.slice(0, 5));
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory.slice(0, 5)));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  // Handle search button press
  const handleSearch = () => {
    if (city.trim() === '') {
      Alert.alert('Input Error', 'Please enter a city name.');
      return;
    }
    saveHistory(city);
    navigation.navigate('Weather', { city });
    setCity('');
    setShowHistory(false);
  };

  // Handle selecting a city from the search history
  const handleSelectItem = (item: string) => {
    setCity(item);
    setShowHistory(false);
    navigation.navigate('Weather', { city: item });
  };

  // Render the component
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ImageBackground
        source={require('../asset/backround.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sweth</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setShowHistory(false)}
            accessibilityLabel="City Name Input"
          />
          {showHistory && history.length > 0 && (
            <View style={styles.historyContainer}>
              {history.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleSelectItem(item)} style={styles.historyItem}>
                  <Text style={styles.historyItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            accessibilityLabel="Search Button"
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
  },
  historyContainer: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  historyItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyItemText: {
    fontSize: 18,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
