import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './vediogrid.module.css';
import { getUserDetails } from '../../../index/utils';
import { Spin } from 'antd';

const VedioGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videoData, videoLoader } = useSelector((state) => state.videos);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const details = {};
      for (const video of videoData) {
        if (!userDetails[video.uploader]) {
          const user = await getUserDetails(video.uploader, dispatch);
          details[video.uploader] = user;
        }
      }
      setUserDetails((prev) => ({ ...prev, ...details }));
    };

    if (videoData && videoData.length > 0) {
      fetchDetails();
    }
  }, [videoData, dispatch]);

  const handleVideoClick = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  return (
    <div className={styles.Vedio_container}>
      {videoLoader ? (
        <div className={styles.loaderWrapper}>
          <Spin size="large" />
        </div>
      ) : (
        videoData && videoData.length > 0 && videoData.map((video) => (
          <div
            key={video.videoId}
            className={styles.videoCard}
            onClick={() => handleVideoClick(video.videoId)}
            style={{ cursor: 'pointer' }}
          >
            <img src={video.thumbnailUrl} alt={video.title} className={styles.thumbnail} />
            <div className={styles.videoInfo}>
              <h4 className={styles.title}>{video.title}</h4>
              <p className={styles.uploader}>
                Uploader: {userDetails[video.uploader]?.username || "Loading..."}
              </p>
              <p className={styles.views}>{video.views.toLocaleString()} views</p>
              <p className={styles.uploadDate}>{new Date(video.uploadDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VedioGrid;
