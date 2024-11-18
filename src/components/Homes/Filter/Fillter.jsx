import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchVideoData } from '../../../Redux/Slice/VideoSlice';
import styles from './filter.module.css';

const Filter = () => {
  const categories = ['All', 'Music', 'Sports', 'News', 'Technology', 'Comedy', 'Cooking', 'Shorts', 'Education', 'Others'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const categoryParam = selectedCategory === 'All' ? '' : selectedCategory.toLowerCase();
    dispatch(fetchVideoData({ category: categoryParam }));
  }, [selectedCategory, dispatch]);

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
