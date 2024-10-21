import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './vediogrid.module.css';
import { vedioData } from '../../../index/utils';

const VedioGrid = () => {
  const [videosData, setVideosData] = useState(vedioData);
  const navigate = useNavigate();

  const handleVideoClick = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  return (
    <div className={styles.Vedio_container}>
      {videosData.map((video) => (
        <div 
          key={video.videoId} 
          className={styles.videoCard} 
          onClick={() => handleVideoClick(video.videoId)}
          style={{ cursor: 'pointer' }} 
        >
          <img src={video.thumbnailUrl} alt={video.title} className={styles.thumbnail} />
          <div className={styles.videoInfo}>
            <h4 className={styles.title}>{video.title}</h4>
            <p className={styles.uploader}>{video.uploader}</p>
            <p className={styles.views}>{video.views.toLocaleString()} views</p>
            <p className={styles.uploadDate}>{video.uploadDate}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VedioGrid;
