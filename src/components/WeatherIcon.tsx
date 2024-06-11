import { faCloud, faSun, faCloudSun, faCloudRain, faSnowflake, faSmog, faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';

interface Props {
    weatherDescription: string;
    size: number;
    color: string;
}

// Function to map weather descriptions to FontAwesome icons
const getWeatherIcon = (weatherDescription: string) => {
    switch (weatherDescription.toLowerCase()) {
        case 'clear':
            return faSun;
        case 'clouds':
            return faCloud;
        case 'rain':
            return faCloudRain;
        case 'drizzle':
            return faCloudSun;
        case 'thunderstorm':
            return faBolt;
        case 'snow':
            return faSnowflake;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            return faSmog;
        default:
            return faCloud;
    }
};

// Functional component to render the appropriate weather icon
const WeatherIcon: React.FC<Props> = ({ weatherDescription, size, color }) => {
    return <FontAwesomeIcon icon={getWeatherIcon(weatherDescription)} size={size} color={color} />;
};

export default WeatherIcon;
