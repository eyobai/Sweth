import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherIcon from './WeatherIcon';

interface Props {
    city: string;
    main: any;
    weather: any;
}

const WeatherDetails: React.FC<Props> = ({ city, main, weather }) => {
    return (
        <View style={styles.weatherContainer}>
            {/* Display city name */}
            <Text style={[styles.city, styles.boldText]}>{city}</Text>
            {/* Display weather icon based on the weather description */}
            <WeatherIcon weatherDescription={weather[0].main} size={100} color="white" />
            {/* Display weather description */}
            <Text style={[styles.weatherDescription]}>{weather[0].description}</Text>
            {/* Display temperature */}
            <Text style={[styles.temperature, styles.boldText]}>{Math.round(main.temp)}°C</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    city: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white',
    },
    weatherDescription: {
        padding: 10,
        fontSize: 25,
        color: 'white',
    },
    temperature: {
        fontSize: 24,
        marginTop: 10,
        color: 'white',
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
});

export default WeatherDetails;
