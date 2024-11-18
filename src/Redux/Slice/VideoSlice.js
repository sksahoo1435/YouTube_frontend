import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import api from "../../Api/Axios";

const initialState = {
    videoData: [],
    video: {},
    videoLoader: false,
};


export const fetchVideoData = (params) => async (dispatch) => {
    dispatch(setVideoLoader(true));
    try {
        const response = await api.get("/video", { params });
        dispatch(setVideoData(response.data?.videos));
    } catch (error) {
        message.error("Failed to fetch video data.");
    } finally {
        dispatch(setVideoLoader(false));
    }
};


export const uploadVideo = (videoData, handleClose) => async (dispatch) => {
    dispatch(setVideoLoader(true));
    try {
        const response = await api.post("/video", videoData);
        if (response.data && response.data.video) {
            message.success("Video uploaded successfully.");
            handleClose(false);
            dispatch(fetchVideoData());
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to upload video.");
    } finally {
        dispatch(setVideoLoader(false));
    }
};


export const getVideoById = (videoId) => async (dispatch) => {
    dispatch(setVideoLoader(true));
    try {
        const response = await api.get(`/video/${videoId}`);

        if (response.data && response.data?.videos) {

            dispatch(setVideo(response.data?.videos));
            console.log("api hit", response.data?.videos);
            return response.data?.videos;
        } else {

            dispatch(setVideo([]));
            return [];
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch video.");
    } finally {
        dispatch(setVideoLoader(false));
    }
};


export const downloadVideo = (videoId) => async () => {
    try {
        const response = await api.get(`/video/download/${videoId}`, {
            responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.setAttribute("download", "video.mp4");
        document.body.appendChild(a);
        a.click();
        a.remove();
        message.success("Video downloaded successfully.");
    } catch (error) {
        message.error("Failed to download video.");
    }
};


export const updateVideo = (videoId, updatedData) => async (dispatch) => {
    dispatch(setVideoLoader(true));
    try {
        const response = await api.put(`/video/${videoId}`, updatedData);
        if (response.data && response.data.video) {
            message.success("Video updated successfully.");
            dispatch(fetchVideoData());
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to update video.");
    } finally {
        dispatch(setVideoLoader(false));
    }
};

export const deleteVideo = (videoId) => async (dispatch) => {
    dispatch(setVideoLoader(true));
    try {
        const response = await api.delete(`/video/${videoId}`);
        if (response.data && response.data.message) {
            message.success("Video deleted successfully.");
            dispatch(fetchVideoData());
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to delete video.");
    } finally {
        dispatch(setVideoLoader(false));
    }
};

const VideoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setVideoData(state, action) {
            state.videoData = action.payload;
        },
        setVideo(state, action) {
            state.video = action.payload;
        },
        setVideoLoader(state, action) {
            state.videoLoader = action.payload;
        },
    }
});

export const { setVideoData, setVideoLoader, setVideo } = VideoSlice.actions;
export default VideoSlice.reducer;
