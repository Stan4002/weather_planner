// WMO Weather Interpretation Codes
// Open-Meteo returns integer codes instead of text.
// This maps those codes to human-readable descriptions.
// Source: https://open-meteo.com/en/docs#weathervariables

const WMO_CODES = {
  0:  'Clear sky',
  1:  'Mainly clear',
  2:  'Partly cloudy',
  3:  'Overcast',
  45: 'Foggy',
  48: 'Icy fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Slight showers',
  81: 'Moderate showers',
  82: 'Violent showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm w/ hail',
  99: 'Thunderstorm w/ hail',
};

export function getCondition(code) {
  return WMO_CODES[code] || 'Unknown';
}

export function formatDayLabel(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  });
}

export function getDayName(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', { weekday: 'long' });
}

// Builds the insight string from the 7-day forecast data.
// Priority: cold warning → heat warning → rain alert → best day
export function buildInsight(daily, avgTemps) {
  const { time, temperature_2m_max, precipitation_probability_max } = daily;

  const coldIdx = temperature_2m_max.findIndex((t) => t < 5);
  const hotIdx  = temperature_2m_max.findIndex((t) => t > 35);
  const rainDays = precipitation_probability_max
    .map((p, i) => ({ prob: p, date: time[i] }))
    .filter((d) => d.prob > 60);

  const minAvg  = Math.min(...avgTemps);
  const bestDay = getDayName(time[avgTemps.indexOf(minAvg)]);

  if (coldIdx !== -1) {
    return {
      type: 'warn',
      text: `Cold warning: ${getDayName(time[coldIdx])} expected to reach only ${Math.round(temperature_2m_max[coldIdx])}°C. Wrap up warm!`,
    };
  }
  if (hotIdx !== -1) {
    return {
      type: 'warn',
      text: `Heat warning: Very hot on ${getDayName(time[hotIdx])} (${Math.round(temperature_2m_max[hotIdx])}°C). Stay hydrated.`,
    };
  }
  if (rainDays.length > 0) {
    const names = rainDays.map((d) => getDayName(d.date)).join(' and ');
    return {
      type: 'neutral',
      text: `Rain likely on ${names} (${rainDays[0].prob}% chance). Best day to go out: ${bestDay} (${minAvg}°C avg).`,
    };
  }
  return {
    type: 'good',
    text: `Best day to go out: ${bestDay} (${minAvg}°C avg). The week looks clear overall!`,
  };
}
