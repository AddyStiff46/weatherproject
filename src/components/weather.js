// src/Weather.js

import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
    try {
      const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
        const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setError('');
    } catch (err) {
    setError('City not found');
    setWeather(null);
    }
};

const handleChange = (e) => {
    setCity(e.target.value);
};

const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
};

return (
    <div>
    <h1>Weather App</h1>
    <form onSubmit={handleSubmit} id="city-form">
        <input type="text" value={city} onChange={handleChange} placeholder="Enter city" id="city-input"/>
        <button type="submit">Get Weather</button>
    </form>
    {error && <p>{error}</p>}
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

export default Weather;
