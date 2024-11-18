import React, { useCallback } from 'react';
import styles from './search.module.css';
import { Input } from 'antd';

const { Search } = Input;

const SearchInput = ({ onSearch }) => {

    const handleSearch = useCallback(
        (value) => {
            onSearch(value);
        },
        [onSearch]
    );

    return (
        <div className={styles.searchContainer}>
            <Search
                placeholder="Search"
                allowClear
                onSearch={handleSearch}
                className={styles.searchInput}
            />
        </div>
    );
};


export default SearchInput;