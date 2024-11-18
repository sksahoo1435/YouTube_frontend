import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaMicrophone, FaSearch, FaArrowLeft } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { IoVideocamSharp } from "react-icons/io5";
import youtube from '../../../assets/images/youtube.png';
import SearchInput from '../Search/Search';
import useMobile from '../../CustomsHooks/UseMobile';
import AuthModal from '../../Authentication/AuthModal';
import CreateChannelModal from '../../Channel/CreateChannelModal';
import { fetchVideoData } from '../../../Redux/Slice/VideoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../../Redux/Slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import UploadVideoModal from '../uploadModal/VideoUploadModal';

const Navbar = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isModalVisibleChannel, setIsModalVisibleChannel] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isLogin, userData, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMobile();

  const handleSignUp = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleChannel(false);
    setIsUploadModalVisible(false);
  };

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownClose = () => {
    setDropdownVisible(false);
  };

  const handleCreateChannelClick = () => {
    setIsModalVisibleChannel(true);
    handleDropdownClose();
  };

  const onSearch = async (query) => {
    const params = query.trim() ? { search: query } : {};

    try {
      dispatch(fetchVideoData(params));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleViewChannel = () => {
    navigate('/channel')
  }

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("userData")) || []

    if (localUser?.userId) {
      dispatch(fetchUserDetails(localUser?.userId));
    }
  }, [])


  return (
    <div className={styles.navbar_container} key={user}>
      <div className={styles.iconNhambugger}>
        <div className={styles.hambugger_icon} onClick={toggleSidebar}>
          <RxHamburgerMenu size="1.5rem" cursor="pointer" />
        </div>
        <div className={`${showSearch ? styles.youtubeIconsInactive : styles.youtubeIcons}`}>
          <img src={youtube} alt='YouTube Icons' />
          <h2>YouTube<sup>IN</sup></h2>
        </div>
      </div>

      {showSearch ? (
        <>
          <div className={styles.back_button} onClick={() => setShowSearch(false)}>
            <FaArrowLeft size="1rem" />
          </div>
          <div className={styles.searchbox1}>
            <SearchInput onSearch={onSearch} />
          </div>
        </>
      ) : (
        <div className={styles.search_mic_container}>
          {isMobile ? (
            <div className={styles.search_icon} onClick={() => setShowSearch(true)}>
              <FaSearch size="1rem" />
            </div>
          ) : (
            <div className={styles.searchbox}>
              <SearchInput onSearch={onSearch} />
            </div>
          )}
          <div className={styles.micBox}>
            <FaMicrophone size="1rem" />
          </div>
        </div>
      )}

      {isLogin ? (
        <div className={styles.profile_button_container}>
          <div className={styles.login_container} onClick={handleProfileClick}>
            {userData && userData?.length !== 0 ? <img src={userData?.avatar} alt='user' /> : <CgProfile fontSize="2rem" color='#4848b69c' />}
          </div>
          <div className={`${showSearch ? styles.HiOutlineDotsVertical : styles.HiOutlineDotsVertical_mobile}`}>
            <HiOutlineDotsVertical size="1rem" />
          </div>
          <div>
            {(user && user?.channels?.length > 0) && <IoVideocamSharp fontSize="1rem" cursor="pointer" onClick={(e) => setIsUploadModalVisible(!isUploadModalVisible)} />}
          </div>
        </div>
      ) : (
        <div className={styles.profile_button_container}>
          <div className={styles.signin_container} onClick={handleSignUp}>
            <div>
              <CgProfile size="1.5rem" color='#4848b69c' />
            </div>
            <div className={styles.signInText}>Sign In</div>
          </div>
          <div className={`${showSearch ? styles.HiOutlineDotsVertical : styles.HiOutlineDotsVertical_mobile}`}>
            <HiOutlineDotsVertical size="1rem" />
          </div>
        </div>
      )}

      {dropdownVisible && (
        <div className={styles.dropdownMenu} onMouseLeave={handleDropdownClose}>
          {(user && user?.channels?.length === 0) && <div className={styles.dropdownItem} onClick={handleCreateChannelClick} >
            Create Channel
          </div>}

          {(user && user?.channels?.length > 0) && <div className={styles.dropdownItem} onClick={handleViewChannel} >
            View Channels
          </div>}

        </div>
      )}
      <AuthModal isModalVisible={isModalVisible} handleCancel={handleCancel} />
      <CreateChannelModal isVisible={isModalVisibleChannel} handleClose={handleCancel} />
      <UploadVideoModal isVisible={isUploadModalVisible} handleClose={handleCancel} />
    </div>
  );
};

export default Navbar;
