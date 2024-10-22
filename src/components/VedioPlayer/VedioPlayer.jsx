import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './vedioplayer.module.css';
import { vedioData } from '../../index/utils';
import { AiOutlineLike, AiTwotoneDislike, AiOutlineShareAlt, AiOutlineDownload } from "react-icons/ai";
import imagePng from '../../assets/images/youtube.png';

const VedioPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const video = vedioData.find((v) => v.videoId === videoId);

  if (!video) {
    return <div>Video not found</div>;
  }

  const handleVideoClick = (newVideoId) => {
    navigate(`/watch/${newVideoId}`);
  };

  return (
    <div className={styles.vedioPlayerPage}>
      <div className={styles.leftSection}>
        <div className={styles.vedioWrapper}>
          <iframe
            className={styles.video}
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.videoInfo}>
          <div className={styles.videoInfo_details}>
            <h2 className={styles.title}>{video.title}</h2>
            <p className={styles.stats}>
              {video.views.toLocaleString()} views • {video.uploadDate}
            </p>
            <p className={styles.uploader}>Uploaded by: {video.uploader}</p>
          </div>

          <div className={styles.videoActions}>
            <button className={styles.actionButton}>
              <AiOutlineLike /> {video.likes.toLocaleString()} <p>Like</p>
            </button>
            <button className={styles.actionButton}>
              <AiTwotoneDislike /> {video.dislikes.toLocaleString()} <p>Dislike</p>
            </button>
            <button className={styles.actionButton}>
              <AiOutlineShareAlt /> <p>Share</p>
            </button>
            <button className={styles.actionButton}>
              <AiOutlineDownload /> <p>Download</p>
            </button>
          </div>
        </div>

        <div className={styles.commentsSection}>
          <h3>Comments</h3>

          <div className={styles.commentInputWrapper}>
            <img src={imagePng} alt="User Avatar" />
            <input
              className={styles.commentInput}
              type="text"
              placeholder="Add a public comment..."
            />
          </div>

          {video.comments.length > 0 ? (
            video.comments.map((comment) => (
              <div key={comment.commentId} className={styles.comment}>
                <img
                  src={comment.userAvatarUrl || imagePng}
                  alt="User Avatar"
                  className={styles.commentAvatar}
                />
                <div className={styles.commentDetails}>
                  <p className={styles.commentUserId}>{comment.userId}</p>
                  <p className={styles.commentText}>{comment.text}</p>
                  <div className={styles.commentActions}>
                    <button>
                      <AiOutlineLike /> Like
                    </button>
                    <button>
                      <AiTwotoneDislike /> Dislike
                    </button>
                    <span className={styles.commentTimestamp}>
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <h3>Recommended Videos</h3>
        <div className={styles.recommendedVideos}>
          {vedioData
            .filter((v) => v.videoId !== videoId)
            .map((recVideo) => (
              <div
                key={recVideo.videoId}
                className={styles.recommendedVideoCard}
                onClick={() => handleVideoClick(recVideo.videoId)}
              >
                <img
                  src={recVideo.thumbnailUrl}
                  alt={recVideo.title}
                  className={styles.recommendedThumbnail}
                />
                <div className={styles.recommendedInfo}>
                  <p className={styles.recommendedTitle}>{recVideo.title}</p>
                  <p className={styles.recommendedUploader}>{recVideo.uploader}</p>
                  <p className={styles.recommendedViews}>
                    {recVideo.views.toLocaleString()} views
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VedioPlayer;
