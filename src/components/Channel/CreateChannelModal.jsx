import React, { useState } from 'react';
import styles from './CreateChannelModal.module.css';
import { createChannel } from '../../Redux/Slice/ChannelSlice';
import { useDispatch, useSelector } from 'react-redux';

const CreateChannelModal = ({ isVisible, handleClose }) => {
  const [formData, setFormData] = useState({
    channelName: '',
    description: '',
    channelBanner: null,
    subscribers: 0,
  });

  const dispatch = useDispatch();
  const { isChannelLoader } = useSelector((state) => state?.channel);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : type === 'number' ? Number(value) : value,
    }));
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();


    const dataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        dataToSubmit.append(key, value);
      }
    });

    try {
      await dispatch(createChannel(dataToSubmit, handleClose)).unwrap();
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      channelName: '',
      description: '',
      channelBanner: null,
      subscribers: 0,
    });
  };

  return (
    isVisible && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Create Channel</h2>
          <form onSubmit={handleCreateChannel}>
            <div className={styles.formGroup}>
              <label>Channel Name:</label>
              <input
                type="text"
                name="channelName"
                value={formData.channelName}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className={styles.textArea}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Channel Banner (Image):</label>
              <input
                type="file"
                name="channelBanner"
                accept="image/*"
                onChange={handleChange}
                required
                className={styles.fileInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Subscribers:</label>
              <input
                type="number"
                name="subscribers"
                value={formData.subscribers}
                onChange={handleChange}
                min="0"
                className={styles.inputField}
              />
            </div>
            <div className={styles.buttonGroup}>
              <button type="button" onClick={handleClose} className={styles.cancelButton}>Cancel</button>
              {isChannelLoader ? "Creating..." : <button type="submit" className={styles.submitButton}>Create Channel</button>}
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateChannelModal;
