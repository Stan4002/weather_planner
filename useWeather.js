// useWeather.js
// Custom React hook that handles all API communication.
// Keeps the data-fetching logic separate from the UI components.

import { useState, useCallback } from 'react';
import { getCondition, formatDayLabel, buildInsight } from './utils';

// Fetches city coordinates from the Open-Meteo geocoding API
async function geocodeCity(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" not found. Check the spelling and try again.`);
  }
  return data.results[0]; // { latitude, longitude, name, country }
}

// Fetches 7-day forecast from Open-Meteo forecast API
async function fetchForecast(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max` +
    `&current_weather=true` +
    `&timezone=auto`;
  const res = await fetch(url);
  return res.json();
}

export function useWeather() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [weather, setWeather] = useState(null);

  // search() is the function called by the search button.
  // useCallback prevents it from being recreated on every render.
  const search = useCallback(async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const { latitude, longitude, name, country } = await geocodeCity(city);
      const data = await fetchForecast(latitude, longitude);
      const { current_weather, daily } = data;

      // Calculate daily averages from max+min
      const maxTemps = daily.temperature_2m_max.map((v) => Math.round(v));
      const minTemps = daily.temperature_2m_min.map((v) => Math.round(v));
      const avgTemps = maxTemps.map((m, i) => Math.round((m + minTemps[i]) / 2));
      const labels   = daily.time.map(formatDayLabel);

      setWeather({
        cityLabel: `${name}, ${country}`,
        currentTemp: `${Math.round(current_weather.temperature)}°C`,
        condition: getCondition(current_weather.weathercode),
        windSpeed: `${Math.round(current_weather.windspeed)} km/h`,
        chart: { labels, avgTemps, maxTemps, minTemps },
        insight: buildInsight(daily, avgTemps),
      });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, weather, search };
}
