import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './vedioplayer.module.css';
import { AiOutlineLike, AiTwotoneDislike, AiOutlineShareAlt, AiOutlineDownload } from "react-icons/ai";
import imagePng from '../../assets/images/youtube.png';
import { useSelector, useDispatch } from 'react-redux';
import { downloadVideo as downloadVideoAction, fetchVideoData, getVideoById } from '../../Redux/Slice/VideoSlice';
import { fetchUserName } from '../../Redux/Slice/AuthSlice';
import { addComment, fetchCommentById, fetchComments, updateComment, deleteComment } from '../../Redux/Slice/CommentSlice';
import { Spin } from 'antd';

const VedioPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { video, videoData, videoLoader } = useSelector((state) => state.videos);
  const { comments } = useSelector((state) => state.comment);
  const [uploaderInfo, setUploaderInfo] = useState({ username: '', user_profile: '' });
  const [recommendedUploaders, setRecommendedUploaders] = useState({});
  const [commentText, setCommentText] = useState('');
  const [editCommentText, setEditCommentText] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [fetchedComments, setFetchedComments] = useState({});
  const [user, setUser] = useState({});
  const userId = JSON.parse(localStorage.getItem('userData') ?? {});
  const getUploaderInfo = async (uploaderId) => {
    const data = await dispatch(fetchUserName(uploaderId));

    return {
      username: data?.username || 'Unknown',
      user_profile: data?.user_profile || imagePng,
    };
  };

  useEffect(() => {
    dispatch(getVideoById(videoId));
    dispatch(fetchVideoData())
    dispatch(fetchComments(videoId))
  }, [dispatch, videoId]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await dispatch(fetchUserName(userId?.userId, dispatch));

      setUser({
        username: data?.username || 'Unknown',
        user_profile: data?.user_profile || imagePng,
      });
    };
    fetchUser();
  }, [userId?.userId]);

  useEffect(() => {
    const fetchUploaderInfo = async () => {
      if (video?.uploader) {
        const info = await getUploaderInfo(video.uploader);
        setUploaderInfo(info);
      }
    };

    const fetchRecommendedUploaders = async () => {
      const recommendedInfo = {};
      for (const recVideo of videoData.filter((v) => v.videoId !== videoId)) {
        if (recVideo.uploader) {
          recommendedInfo[recVideo.videoId] = await getUploaderInfo(recVideo.uploader);
        }
      }
      setRecommendedUploaders(recommendedInfo);
    };

    fetchUploaderInfo();
    fetchRecommendedUploaders();
  }, [dispatch, video?.uploader, videoId, videoData]);


  const handleVideoClick = (newVideoId) => {
    navigate(`/watch/${newVideoId}`);
  };

  const handleDownload = () => {
    dispatch(downloadVideoAction(videoId));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const commentData = { text: commentText, videoId };
      await dispatch(addComment(commentData));
      setCommentText('');
    }
  };

  const handleEditComment = (commentId, text) => {
    setEditCommentId(commentId);
    setEditCommentText(text);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (editCommentText.trim() && editCommentId) {
      await dispatch(updateComment(editCommentId, { text: editCommentText }));
      setEditCommentId(null);
      setEditCommentText('');
    }
  };

  const handleDeleteComment = async (commentId) => {
    await dispatch(deleteComment(commentId));
  };

  useEffect(() => {
    const fetchAllComments = async () => {
      if (comments?.length > 0) {
        const commentsData = {};

        for (const item of comments) {

          const comment = await dispatch(fetchCommentById(item?.commentId));
          if (comment) {
            const userDetails = await getUploaderInfo(comment.userId);
            commentsData[item?.commentId] = { ...comment, userDetails };
          }
        }
        setFetchedComments(commentsData);
      }
    };
    fetchAllComments();
  }, [comments]);



  if (videoLoader) {
    return <div>Loading video...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return videoLoader ? (
    <div className={styles.loaderWrapper}>
      <Spin size="large" />
    </div>
  ) : (
    <div className={styles.vedioPlayerPage}>
      <div className={styles.leftSection}>
        <div className={styles.vedioWrapper}>
          <video className={styles.video} controls>
            <source src={video?.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={styles.videoInfo}>
          <div className={styles.videoInfo_details}>
            <h2 className={styles.title}>{video?.title}</h2>
            <p className={styles.stats}>
              {video?.views?.toLocaleString()} views • {new Date(video?.uploadDate)?.toLocaleDateString()}
            </p>
            <p className={styles.uploader}>Uploaded by: {uploaderInfo.username}</p>
          </div>

          <div className={styles.videoActions}>
            <button className={styles.actionButton}>
              <AiOutlineLike /> {video?.likes?.toLocaleString()} <p>Like</p>
            </button>
            <button className={styles.actionButton}>
              <AiTwotoneDislike /> {video?.dislikes?.toLocaleString()} <p>Dislike</p>
            </button>
            <button className={styles.actionButton}>
              <AiOutlineShareAlt /> <p>Share</p>
            </button>
            <button className={styles.actionButton} onClick={handleDownload}>
              <AiOutlineDownload /> <p>Download</p>
            </button>
          </div>

        </div>
        <div>
          <p className={styles.uploader} >{video?.description}</p>
        </div>

        <div className={styles.commentsSection} >
          <h3>Comments</h3>
          <form onSubmit={handleCommentSubmit} className={styles.commentInputWrapper}>
            <img src={user?.user_profile || imagePng} alt="User Avatar" />
            <input
              className={styles.commentInput}
              type="text"
              placeholder="Add a public comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>

          {comments?.length > 0 ? (
            comments.map((comment) => (
              <div key={comment?.commentId} className={styles.comment}>
                <img
                  src={fetchedComments[comment?.commentId]?.userDetails?.user_profile || imagePng}
                  alt="User Avatar"
                  className={styles.commentAvatar}
                />
                <div className={styles.commentDetails}>
                  {editCommentId === comment?.commentId ? (
                    <form onSubmit={handleEditSubmit}>
                      <input
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                      />
                      <button type="submit">Update</button>
                      <button onClick={() => setEditCommentId(null)} style={{ marginLeft: "10px" }}>Cancel</button>
                    </form>
                  ) : (
                    <>
                      <p className={styles.commentUserId}>
                        {fetchedComments[comment?.commentId]?.userDetails?.username || 'User'}
                      </p>
                      <p className={styles.commentText}>
                        {fetchedComments[comment?.commentId]?.text || 'Loading...'}
                      </p>
                    </>
                  )}
                  <div className={styles.commentActions}>
                    <button>
                      <AiOutlineLike /> Like
                    </button>
                    <button>
                      <AiTwotoneDislike /> Dislike
                    </button>

                    {userId?.userId === comment?.userId && <button onClick={() => handleEditComment(comment?.commentId, fetchedComments[comment?.commentId]?.text)}>
                      Edit
                    </button>}
                    {userId?.userId === comment?.userId && <button onClick={() => handleDeleteComment(comment?.commentId)}>
                      Delete
                    </button>}
                    <span className={styles.commentTimestamp}>
                      {new Date(fetchedComments[comment?.commentId]?.timestamp)?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No comments available</p>
          )}
        </div>
      </div>

      <div className={styles.rightSection}>
        <h3>Recommended Videos</h3>
        <div className={styles.recommendedVideos}>
          {videoData
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
                  <p className={styles.recommendedUploader}>
                    {recommendedUploaders[recVideo.videoId]?.username || 'Unknown'}
                  </p>
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
