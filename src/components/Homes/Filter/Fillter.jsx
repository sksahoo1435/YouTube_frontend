import React from 'react';
import styles from './filter.module.css';

const Filter = () => {
    const categories = ['All', 'Music', 'Movies', 'React', 'Node', 'Python', 'Concert', 'Routers'];

    return (
        <div className={styles.filterContainer}>
            {categories.map((category) => (
                <button key={category} className={styles.filterButton}>
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Filter;
