import React, { useEffect } from 'react'
import styles from './home.module.css';
import Fillter from './Filter/Fillter';
import VedioGrid from './VedioWraper/VedioGrid';
import { fetchVideoData } from '../../Redux/Slice/VideoSlice';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchVideoData())
    }, [])
    return (
        <div className={styles.home_container}>
            <Fillter />
            <VedioGrid />
        </div>
    )
}

export default Home