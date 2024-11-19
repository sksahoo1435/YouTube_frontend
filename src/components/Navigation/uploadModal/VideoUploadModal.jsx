import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './UploadVideoModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uploadVideo } from '../../../Redux/Slice/VideoSlice';
import { getChannels } from '../../../Redux/Slice/ChannelSlice';

const UploadVideoModal = ({ isVisible, handleClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    channel: '',
    category: 'music',
    thumbnail: null,
    video: null,
  });
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { allChannelAll } = useSelector((state) => state.channel);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('userData')) || [];
    if (localUser?.userId) {
      dispatch(getChannels());
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'thumbnail' || name === 'video') {
      const file = files[0];
      if (name === 'video' && file) {
        // Check if video file size is greater than 8 MB (8 * 1024 * 1024 bytes)
        if (file.size > 8 * 1024 * 1024) {
          setError('Video file size exceeds 8 MB. Please select a smaller video.');
          return;
        } else {
          setError(''); // Clear any previous errors if the file size is valid
        }
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const isFormValid = () => {
    const { title, description, category, thumbnail, video } = formData;
    return title && description && category && thumbnail && video;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError('Please fill all the fields and select files.');
      return;
    }

    const { title, description, category, channel, thumbnail, video } = formData;
    const uploadData = new FormData();
    uploadData.append('title', title);
    uploadData.append('description', description);
    uploadData.append('category', category);
    uploadData.append('channelId', channel);
    uploadData.append('thumbnail', thumbnail);
    uploadData.append('video', video);

    try {
      setLoading(true);
      setError('');
      await dispatch(uploadVideo(uploadData, handleClose));
      console.log('Video Uploaded:', formData);
    } catch (error) {
      setError('Error uploading video. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Upload Video</h2>
          <button onClick={handleClose} className={styles.closeButton}>
            <FaTimes fill="#000" />
          </button>
        </div>

        <form onSubmit={handleUpload}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your video"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {['music', 'sports', 'news', 'technology', 'comedy', 'cooking', 'shorts', 'education', 'others'].map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="channel">Channel</label>
            <select
              id="channel"
              name="channel"
              value={formData.channel}
              onChange={handleChange}
              required
            >
              <option value="">Select Channel</option>
              {allChannelAll.map((channel) => (
                <option key={channel._id} value={channel.channelId}>
                  {channel.channelName}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="thumbnail">Thumbnail</label>
            <input
              id="thumbnail"
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="video">Video</label>
            <input
              id="video"
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadVideoModal;
