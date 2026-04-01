# Weather Planner — React Version 🌤️

A 7-day weather forecast app built with **React**, **Chart.js**, and the free **Open-Meteo API**.

> **Module**: Web Development Practicals  
> **Student**: Stanley  
> **Institution**: Zambia University of Technology (ZUT)

---

## How to Run

### Prerequisites
You need **Node.js** installed. Download it free at https://nodejs.org (get the LTS version).

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/Stan4002/weather_planner.git
cd weather_planner

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

The app opens automatically at **http://localhost:3000**

### Build for production
```bash
npm run build
```
This creates a `build/` folder with optimised static files ready for deployment.

---

## Project Structure

```
src/
├── index.js            # Entry point — mounts React into the DOM
├── index.css           # Global reset and body styles
├── App.jsx             # Root component — wires everything together
├── App.module.css      # App-level styles
├── useWeather.js       # Custom hook — all API fetching logic
├── utils.js            # WMO codes, date formatters, insight builder
├── SearchBar.jsx       # City search input + button
├── SearchBar.module.css
├── WeatherCard.jsx     # Current conditions display
├── WeatherCard.module.css
├── TempChart.jsx       # Chart.js line chart (via react-chartjs-2)
├── TempChart.module.css
├── InsightCard.jsx     # Smart insight display
└── InsightCard.module.css
```

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI component framework |
| react-chartjs-2 + Chart.js 4 | Line chart for temperature trend |
| CSS Modules | Scoped styles per component |
| Open-Meteo API | Free weather data, no API key needed |

---

## API Used

**Open-Meteo** — free, open-source, no sign-up required.

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`

---

## Component Overview

| Component | What it does |
|-----------|-------------|
| `App.jsx` | Root component. Holds state, calls `useWeather`, renders children |
| `useWeather.js` | Custom hook: geocodes city → fetches forecast → shapes data |
| `SearchBar.jsx` | Controlled input, triggers search on click or Enter key |
| `WeatherCard.jsx` | Shows city name, current temp, condition, wind speed |
| `TempChart.jsx` | Line chart of 7-day average temps with high/low tooltips |
| `InsightCard.jsx` | Displays smart insight (warn/good/neutral) from `utils.js` |
| `utils.js` | WMO code map, date helpers, `buildInsight()` priority logic |

---

## Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://Stan4002.github.io/weather_planner",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

---

## AI Prompts Used (Open Book)

**Prompt 1** — *"How do I structure a React app that fetches data from an API and passes it to child components?"*  
Response summary: Use a custom hook (`useWeather`) to handle fetching and state. Return `{ loading, error, data }` and consume it in the root component. Pass shaped data down as props to presentational components.

**Prompt 2** — *"What is the correct way to register Chart.js components in react-chartjs-2 v5?"*  
Response summary: Import and call `Chart.register(...)` with only the specific components you need (LineElement, CategoryScale, etc.) to keep the bundle size small. This replaces the old `import 'chart.js/auto'` approach.

**Prompt 3** — *"How do CSS Modules work in React and why use them instead of a single stylesheet?"*  
Response summary: CSS Modules scope class names to the component file, preventing style clashes. Import as `import styles from './Component.module.css'` and apply as `className={styles.myClass}`.

**Prompt 4** — *"What is useCallback and why would I wrap my search function with it?"*  
Response summary: `useCallback` memoises a function so it isn't recreated on every render. Wrapping `search` prevents the `useEffect` in `App.jsx` from triggering an infinite loop when `search` is listed as a dependency.
