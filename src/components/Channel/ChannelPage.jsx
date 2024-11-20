import React, { useEffect, useState } from "react";
import styles from "./channel.module.css";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails } from "../../Redux/Slice/AuthSlice";
import { getChannelById } from "../../Redux/Slice/ChannelSlice";
import { getVideoById } from "../../Redux/Slice/VideoSlice";

const ChannelPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = JSON.parse(localStorage.getItem("userData") ?? "{}");
    const [selectedTab, setSelectedTab] = useState("Videos");
    const [videoDetails, setVideoDetails] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { channel } = useSelector((state) => state.channel);

    useEffect(() => {

        if (userId?.userId) {

            dispatch(fetchUserDetails(userId.userId));
        }
    }, []);

    useEffect(() => {

        if (user?.channels?.[0]) {

            dispatch(getChannelById(user?.channels?.[0]?.id));
        }
    }, [user]);

    useEffect(() => {
        const fetchVideoDetails = async () => {
            if (selectedTab === "Videos" && channel?.videos?.length) {
                try {
                    const videos = await Promise.all(
                        channel.videos.map(async (videoId) => {
                            const videoData = await dispatch(getVideoById(videoId));
                            return videoData || null;
                        })
                    );
                    setVideoDetails(videos.filter(Boolean));
                } catch (error) {
                    console.error("Error fetching video details:", error);
                }
            }
        };

        fetchVideoDetails();
    }, [dispatch, selectedTab, channel?.videos]);


    const handleVideoClick = (videoId) => {
        navigate(`/watch/${videoId}`);
    };

    const renderContent = () => {
        if (selectedTab === "Videos") {
            return (
                <div className={styles.videosContainer}>
                    <h2>Videos</h2>
                    <div className={styles.videoGrid}>
                        {videoDetails.map((video) => (
                            <div
                                key={video.videoId}
                                className={styles.videoItem}
                                onClick={() => handleVideoClick(video.videoId)}
                            >
                                <img
                                    src={video.thumbnailUrl}
                                    alt={`Thumbnail for ${video.title}`}
                                    className={styles.videoThumbnail}
                                />
                                <p className={styles.videoTitle}>{video.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
            return <h2 className={styles.comingSoon}>Page is coming soon</h2>;
        }
    };

    return (
        <div className={styles.channelPageContainer}>
            <div className={styles.bannerContainer}>
                <img src={channel?.channelBanner} alt={`${channel?.channelName} Banner`} className={styles.channelBanner} />
            </div>
            <div className={styles.channelInfo}>
                <div className={styles.channelHeader}>
                    <Avatar src={channel?.owner?.avatar} size={64} className={styles.profilePic} />
                    <div className={styles.channelDetails}>
                        <h1 className={styles.channelName}>{channel?.channelName}</h1>
                        <p className={styles.subscriberCount}>{channel?.subscribers} Subscribers</p>
                        <p className={styles.description}>{channel?.description}</p>
                    </div>
                </div>
            </div>

            <div className={styles.navigationTabs}>
                <button
                    className={`${styles.tabButton} ${selectedTab === "Home" ? styles.activeTab : ""}`}
                    onClick={() => setSelectedTab("Home")}
                >
                    Home
                </button>
                <button
                    className={`${styles.tabButton} ${selectedTab === "Videos" ? styles.activeTab : ""}`}
                    onClick={() => setSelectedTab("Videos")}
                >
                    Videos
                </button>
                <button
                    className={`${styles.tabButton} ${selectedTab === "Shorts" ? styles.activeTab : ""}`}
                    onClick={() => setSelectedTab("Shorts")}
                >
                    Shorts
                </button>
                <button
                    className={`${styles.tabButton} ${selectedTab === "Lives" ? styles.activeTab : ""}`}
                    onClick={() => setSelectedTab("Lives")}
                >
                    Lives
                </button>
            </div>

            <div className={styles.tabContent}>
                {renderContent()}
            </div>
        </div>
    );
};

export default ChannelPage;