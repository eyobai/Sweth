import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import WeatherIcon from './WeatherIcon';

interface Props {
    forecastData: any[];
}

// Function to get the day of the week from a date string
const getDayOfWeek = (dateString: string) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
};

// Function to summarize forecast data by selecting one forecast per day
const summarizeForecastData = (forecastData: any[]) => {
    const summarizedForecast: { [key: string]: any } = {};
    forecastData.forEach((forecast) => {
        const date = forecast.dt_txt.split(' ')[0];
        if (!summarizedForecast[date] || summarizedForecast[date].dt_txt.split(' ')[1] > forecast.dt_txt.split(' ')[1]) {
            summarizedForecast[date] = forecast;
        }
    });
    return Object.values(summarizedForecast);
};

const ForecastList: React.FC<Props> = ({ forecastData }) => {
    return (
        <View style={styles.forecastContainer}>
            {/* Display forecast title */}
            <Text style={styles.forecastTitle}>Week Forecast</Text>
            {/* Display a horizontal list of summarized forecast items */}
            <FlatList
                data={summarizeForecastData(forecastData)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.forecastItem}>
                        {/* Display day of the week */}
                        <Text style={{ fontSize: 16, color: 'white', alignSelf: 'center', marginBottom: 10 }}>{getDayOfWeek(item.dt_txt)}</Text>
                        {/* Display weather icon, description, and temperature */}
                        <View style={styles.forecastData}>
                            <WeatherIcon weatherDescription={item.weather[0].main} size={30} color="white" />
                            <Text style={styles.forecastText}>{item.weather[0].description}</Text>
                            <Text style={styles.forecastText}>{Math.round(item.main.temp)}°C</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    forecastContainer: {
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
        paddingTop: 10,
        paddingHorizontal: 10,
        marginBottom: 100,
    },
    forecastTitle: {
        fontSize: 25,
        color: 'white',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    forecastItem: {
        marginRight: 10,
    },
    forecastData: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    forecastText: {
        fontSize: 16,
        color: 'white',
        marginTop: 5,
        marginBottom: 10,
    },
});

export default ForecastList;
