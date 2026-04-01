// TempChart.jsx
// Renders the 7-day temperature trend line chart.
// Uses react-chartjs-2 (a React wrapper around Chart.js).
// All Chart.js components must be registered before use — that's the
// `Chart.register(...)` call at the top.

import React from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './TempChart.module.css';

// Register only the Chart.js pieces we actually use (keeps bundle small)
Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Title
);

function TempChart({ labels, avgTemps, maxTemps, minTemps }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Avg Temp (°C)',
        data: avgTemps,
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74,144,226,0.08)',
        pointBackgroundColor: '#4a90e2',
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2.5,
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          // Show full detail in hover tooltip
          label: (ctx) =>
            `Avg: ${ctx.parsed.y}°C  |  High: ${maxTemps[ctx.dataIndex]}°  Low: ${minTemps[ctx.dataIndex]}°`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#999', font: { size: 11 }, maxRotation: 35 },
      },
      y: {
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { color: '#999', callback: (v) => `${v}°C` },
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: '#aaa',
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Temperature Trend</h2>
      <div className={styles.wrapper}>
        <Line data={data} options={options} />
      </div>
    </section>
  );
}

export default TempChart;
