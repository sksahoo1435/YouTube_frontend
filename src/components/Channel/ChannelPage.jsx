import React from 'react';
import styles from './channel.module.css';
import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const ChannelPage = () => {
    const navigate = useNavigate();
    const channelData = {
        channelId: "channel01",
        channelName: "Code with John",
        owner: "user01",
        description: "Coding tutorials and tech reviews by John Doe.",
        channelBanner: "https://picsum.photos/seed/picsum/200/300",
        profilePic: "https://picsum.photos/seed/picsum/200/300",
        subscribers: 5200,
        videos: ["8clJziVcql4", "Afs6QbzMyuM", "DZC0tquy0kU", "4Eo24Wqp3Rw"],
    };

    const handleVideoClick = (videoId) => {
        navigate(`/watch/${videoId}`);
    };

    return (
        <div className={styles.channelPageContainer}>
            <div className={styles.bannerContainer}>
                <img src={channelData.channelBanner} alt={`${channelData.channelName} Banner`} className={styles.channelBanner} />
            </div>
            <div className={styles.channelInfo}>
                <div className={styles.channelHeader}>
                    <Avatar src={channelData.profilePic} size={64} className={styles.profilePic} />
                    <div className={styles.channelDetails}>
                        <h1 className={styles.channelName}>{channelData.channelName}</h1>
                        <p className={styles.subscriberCount}>{channelData.subscribers} Subscribers</p>
                        <p className={styles.description}>{channelData.description}</p>
                    </div>
                </div>
            </div>

            <div className={styles.navigationTabs}>
                <button className={styles.tabButton}>Home</button>
                <button className={styles.tabButton}>Videos</button>
                <button className={styles.tabButton}>Shorts</button>
                <button className={styles.tabButton}>Lives</button>
            </div>

            <div className={styles.videosContainer}>
                <h2>Videos</h2>
                <div className={styles.videoGrid}>
                    {channelData.videos.map((video, index) => (
                        <div key={index} className={styles.videoItem} onClick={() => handleVideoClick(video)}>
                            <img
                                src={`https://img.youtube.com/vi/${video}/hqdefault.jpg`}
                                alt={`Thumbnail for ${video}`}
                                className={styles.videoThumbnail}
                            />
                            <p className={styles.videoTitle}>Video {video}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChannelPage;
