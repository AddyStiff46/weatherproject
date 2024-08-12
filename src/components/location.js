// src/components/GetLocation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetLocation = () => {
const [location, setLocation] = useState(null);
const [weather, setWeather] = useState(null);
const [error, setError] = useState('');

useEffect(() => {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
        setError('Geolocation is not enabled. Please enable to use this feature.');
        }
    );
    } else {
    setError('Geolocation is not supported by this browser.');
    }
}, []);

const fetchWeatherByCoordinates = async (latitude, longitude) => {
    try {
    const response = await axios.get(
        // eslint-disable-next-line no-template-curly-in-string
        "https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=1${longitude}&current=temperature_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&forecast_hours=24&models=best_match"
    );
    setWeather(response.data);
    setError('');
    } catch (err) {
    setError('Unable to fetch weather data for your location.');
    setWeather(null);
    }
};

return (
    <div>
    {error && <p>{error}</p>}
    {location && (
        <div>
        <h3>Your Location</h3>
        <p>Latitude: {location.latitude}</p>
        <p>Longitude: {location.longitude}</p>
        </div>
    )}
    {weather && (
        <div>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp} °C</p>
        <p>Weather: {weather.weather[0].description}</p>
        </div>
    )}
    </div>
    );
};

export default GetLocation;