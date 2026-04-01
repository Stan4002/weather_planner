// SearchBar.jsx
// Controlled input component for city search.
// Calls onSearch when the button is clicked or Enter is pressed.

import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('London');

  function handleSearch() {
    onSearch(value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className={styles.bar}>
      <label htmlFor="cityInput" className={styles.label}>
        Enter city:
      </label>
      <input
        id="cityInput"
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. Lusaka, London, Tokyo"
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
