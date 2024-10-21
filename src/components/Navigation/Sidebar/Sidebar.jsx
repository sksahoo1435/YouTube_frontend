import React from 'react';
import { AiFillHome, AiOutlineFire, AiOutlineVideoCamera } from 'react-icons/ai';
import { MdShortText, MdDensitySmall, MdHistory, MdWatchLater, MdThumbUp } from 'react-icons/md';
import { BiShoppingBag, BiMusic } from 'react-icons/bi';
import { RiMovie2Line, RiLiveLine } from 'react-icons/ri';
import { GiGamepad } from 'react-icons/gi';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdSportsBasketball } from 'react-icons/md';
import { FaRegCircleUser } from "react-icons/fa6";
import { SiYoutubeshorts } from "react-icons/si";

import styles from './sidebar.module.css';

const Sidebar = ({ isCollapsed }) => {
    return (
        <aside aside className={isCollapsed ? styles.sidebar_collapsed : styles.sidebar_expanded}>
            <div className={styles.sidebar_section}>
                <button className={styles.sidebar_button}>
                    <AiFillHome className="icon" />
                    {!isCollapsed && <span>Home</span>}
                </button>

                <button className={styles.sidebar_button}>
                    <SiYoutubeshorts className="icon" />
                    {!isCollapsed && <span>Shorts</span>}
                </button>

                <button className={styles.sidebar_button}>
                    <AiOutlineVideoCamera className="icon" />
                    {!isCollapsed && <span>Subscriptions</span>}
                </button>

                {isCollapsed &&<button className={styles.sidebar_button}>
                    <FaRegCircleUser className="icon" />
                </button>}
            </div>

            {!isCollapsed && <div className={styles.sidebar_section}>
                <div className={styles.separator} />
                <h3>You</h3>

                <button className={styles.sidebar_button}>
                    <AiOutlineVideoCamera className="icon" />
                    <span>Your Videos</span>
                </button>

                <button className={styles.sidebar_button}>
                    <MdHistory className="icon" />
                    <span>History</span>
                </button>

                <button className={styles.sidebar_button}>
                    <MdWatchLater className="icon" />
                    <span>Watch Later</span>
                </button>

                <button className={styles.sidebar_button}>
                    <MdThumbUp className="icon" />
                    <span>Liked Videos</span>
                </button>
            </div>}

            {!isCollapsed && <div className={styles.sidebar_section}>
                <div className={styles.separator} />
                <h3>Subscriptions</h3>

                <button className={styles.sidebar_button}>
                    <MdDensitySmall className="icon" />
                    <span>All Subscriptions</span>
                </button>
            </div>}

            {!isCollapsed && <div className={styles.sidebar_section}>
                <div className={styles.separator} />
                <h3>Explore</h3>

                <button className={styles.sidebar_button}>
                    <AiOutlineFire className="icon" />
                    <span>Trending</span>
                </button>

                <button className={styles.sidebar_button}>
                    <BiShoppingBag className="icon" />
                    <span>Shopping</span>
                </button>

                <button className={styles.sidebar_button}>
                    <BiMusic className="icon" />
                    <span>Music</span>
                </button>

                <button className={styles.sidebar_button}>
                    <RiMovie2Line className="icon" />
                    <span>Films</span>
                </button>

                <button className={styles.sidebar_button}>
                    <RiLiveLine className="icon" />
                    <span>Live</span>
                </button>

                <button className={styles.sidebar_button}>
                    <GiGamepad className="icon" />
                    <span>Gaming</span>
                </button>

                <button className={styles.sidebar_button}>
                    <IoNewspaperOutline className="icon" />
                    <span>News</span>
                </button>

                <button className={styles.sidebar_button}>
                    <MdSportsBasketball className="icon" />
                    <span>Sports</span>
                </button>

                <button className={styles.sidebar_button}>
                    <MdShortText className="icon" />
                    <span>Courses</span>
                </button>

                <button className={styles.sidebar_button}>
                    <MdShortText className="icon" />
                    <span>Podcasts</span>
                </button>
            </div>}
        </aside>
    );
};

export default Sidebar;

