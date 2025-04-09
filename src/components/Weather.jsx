import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import cloud_icon from '../Assets/cloud.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';
import drizzle_icon from '../Assets/drizzle.png';
import refresh_icon from '../Assets/refresh.png'; // optional: add a refresh icon

function Weather() {
  const inputRef = useRef();
  const [weatherData, setWeather] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': cloud_icon,
    '04n': cloud_icon,
    '09d': drizzle_icon,
    '09n': drizzle_icon,
    '10d': rain_icon,
    '10n': rain_icon,
    '11d': rain_icon,
    '11n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  const search = async (city) => {
    if (!city.trim()) {
      alert('Please enter a city name');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon];
      setWeather({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      setCurrentCity(data.name);

      // update recent history
      setSearchHistory((prev) => {
        const updated = [data.name, ...prev.filter((c) => c.toLowerCase() !== data.name.toLowerCase())];
        return updated.slice(0, 5);
      });
    } catch (error) {
      setWeather(false);
      console.log('Error in fetching the data');
    }
  };

  useEffect(() => {
    search('Bhubaneshwar');
  }, []);

  // handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(inputRef.current.value);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city"
          onKeyDown={handleKeyDown}
        />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>

      {/* 🔁 Refresh Button */}
      {currentCity && (
        <div className="refresh">
          <button className="btn" onClick={() => search(currentCity)}>🔄 Refresh</button>
        </div>
      )}

      {/* 🕘 Recent Searches */}
      {searchHistory.length > 0 && (
        <div className="recent-history">
          <p>Recent Searches:</p>
          {searchHistory.map((city, index) => (
            <button
              key={index}
              className="btn history-btn"
              onClick={() => search(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className="weather_icon" />
          <p className="Temperature">{weatherData.temperature}°C</p>
          <p className="Location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.wind} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
