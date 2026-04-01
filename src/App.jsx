// App.jsx
// Root component. Owns the state and wires all child components together.
// Uses the useWeather custom hook for all data fetching.
// On mount (useEffect), auto-searches London.

import React, { useEffect } from 'react';
import { useWeather } from '../useWeather';
import SearchBar from '../SearchBar';
import WeatherCard from '../WeatherCard';
import TempChart from '../TempChart';
import InsightCard from '../InsightCard';
import styles from '../App.module.css';

function App() {
  const { loading, error, weather, search } = useWeather();

  // Auto-load London when the page first opens
  useEffect(() => {
    search('London');
  }, [search]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Weather Planner</h1>
        <p className={styles.subtitle}>7-day forecast with smart daily insights</p>
      </header>

      <SearchBar onSearch={search} />

      {loading && <p className={styles.loader}>Fetching weather data...</p>}
      {error   && <div className={styles.error}>{error}</div>}

      {weather && (
        <>
          <WeatherCard
            cityLabel={weather.cityLabel}
            currentTemp={weather.currentTemp}
            condition={weather.condition}
            windSpeed={weather.windSpeed}
          />
          <TempChart
            labels={weather.chart.labels}
            avgTemps={weather.chart.avgTemps}
            maxTemps={weather.chart.maxTemps}
            minTemps={weather.chart.minTemps}
          />
          <InsightCard insight={weather.insight} />
        </>
      )}
    </div>
  );
}

export default App;
