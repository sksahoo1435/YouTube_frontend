import React, { useState } from 'react';
import styles from './filter.module.css';

const Filter = () => {
  const categories = ['All', 'Music', 'Movies', 'React', 'Node', 'Python', 'Concert', 'Routers'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.filterContainer}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterButton} ${selectedCategory === category ? styles.selected : ''}`}
          onClick={() => handleCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;
