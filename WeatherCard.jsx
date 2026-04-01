// WeatherCard.jsx
// Displays the current weather snapshot:
// city name, temperature, condition, wind speed.

import React from 'react';
import styles from './WeatherCard.module.css';

function WeatherCard({ cityLabel, currentTemp, condition, windSpeed }) {
  return (
    <div className={styles.card}>
      <div className={styles.cityName}>{cityLabel}</div>
      <div className={styles.grid}>
        <div className={styles.item}>
          <span className={styles.label}>Current Temperature</span>
          <span className={styles.value}>{currentTemp}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Condition</span>
          <span className={`${styles.value} ${styles.condition}`}>{condition}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Wind Speed</span>
          <span className={styles.value}>{windSpeed}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
