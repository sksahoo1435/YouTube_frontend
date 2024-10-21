import React from 'react'
import styles from './home.module.css';
import Fillter from './Filter/Fillter';
import VedioGrid from './VedioWraper/VedioGrid';

const Home = () => {
    return (
        <div className={styles.home_container}>
            <Fillter />
            <VedioGrid/>
        </div>
    )
}

export default Home