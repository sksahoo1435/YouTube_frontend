import React from 'react'
import styles from './search.module.css';
import { Input, Space } from 'antd';
const { Search } = Input;

const SearchInput = () => {
    return (
        <Search
            placeholder="Search"
            allowClear
            // onSearch={onSearch}
        />
    )
}

export default SearchInput