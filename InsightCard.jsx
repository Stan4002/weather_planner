// InsightCard.jsx
// Shows the smart insight derived from the 7-day forecast.
// Changes text colour based on type: 'warn', 'good', or 'neutral'.

import React from 'react';
import styles from './InsightCard.module.css';

function InsightCard({ insight }) {
  const textClass =
    insight.type === 'warn'
      ? styles.warn
      : insight.type === 'good'
      ? styles.good
      : styles.neutral;

  return (
    <div className={styles.card}>
      <div className={styles.label}>Insight</div>
      <p className={`${styles.text} ${textClass}`}>{insight.text}</p>
    </div>
  );
}

export default InsightCard;
