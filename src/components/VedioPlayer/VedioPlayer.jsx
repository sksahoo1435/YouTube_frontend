// import React from 'react';
// import { useParams } from 'react-router-dom';
// import styles from './vedioplayer.module.css';
// import { vedioData } from '../../index/utils';

// const VedioPlayer = () => {
//   const { videoId } = useParams();
//   const video = vedioData.find((v) => v.videoId === videoId);

//   if (!video) {
//     return <div>Video not found</div>;
//   }

//   return (
//     <div className={styles.vedioPlayerPage}>
//       {/* Left Section: Video Player and Video Info */}
//       <div className={styles.leftSection}>
//         <div className={styles.vedioWrapper}>
//           <iframe
//             className={styles.video}
//             src={`https://www.youtube.com/embed/${video.videoId}`}
//             title={video.title}
//             allowFullScreen
//           ></iframe>
//         </div>
//         <div className={styles.videoInfo}>
//           <h2 className={styles.title}>{video.title}</h2>
//           <p className={styles.stats}>
//             {video.views.toLocaleString()} views • {video.uploadDate}
//           </p>
//           <p className={styles.uploader}>Uploaded by: {video.uploader}</p>
//         </div>
//       </div>

//       {/* Right Section: Recommended Videos */}
//       <div className={styles.rightSection}>
//         <h3>Recommended Videos</h3>
//         <div className={styles.recommendedVideos}>
//           {vedioData
//             .filter((v) => v.videoId !== videoId) // Filter out the current video
//             .map((recVideo) => (
//               <div key={recVideo.videoId} className={styles.recommendedVideoCard}>
//                 <img
//                   src={recVideo.thumbnailUrl}
//                   alt={recVideo.title}
//                   className={styles.recommendedThumbnail}
//                 />
//                 <div className={styles.recommendedInfo}>
//                   <p className={styles.recommendedTitle}>{recVideo.title}</p>
//                   <p className={styles.recommendedUploader}>{recVideo.uploader}</p>
//                   <p className={styles.recommendedViews}>
//                     {recVideo.views.toLocaleString()} views
//                   </p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VedioPlayer;


import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './vedioplayer.module.css';
import { vedioData } from '../../index/utils';

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
          <h2 className={styles.title}>{video.title}</h2>
          <p className={styles.stats}>
            {video.views.toLocaleString()} views • {video.uploadDate}
          </p>
          <p className={styles.uploader}>Uploaded by: {video.uploader}</p>
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
