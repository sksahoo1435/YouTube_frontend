import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import api from "../../Api/Axios";
import { BASE_URL } from '../../index/utils';


const initialState = {
    isChannelLoader: false,
    allChannelAll: [],
    channel: []
}

const ChannelSlice = createSlice({
    name: "channel",
    initialState: initialState,
    reducers: {
        setIsChannelLoader(state, action) {
            state.isChannelLoader = action.payload;
        },
        setChannel(state, action) {
            state.channel = action.payload;
        },
        setAllChannel(state, action) {
            state.allChannelAll = action.payload;
        }
    }
})


export const createChannel = (channelData,handleClose) => async (dispatch) => {
    dispatch(setIsChannelLoader(true));
    try {
        const response = await api.post(`${BASE_URL}channel/channel`, channelData);

        if (response.data && response.data.message) {
            message.success(response.data.message);
            handleClose()
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to create channel. Please try again.");
    } finally {
        dispatch(setIsChannelLoader(false));
    }
};


export const getChannels = () => async (dispatch) => {
    dispatch(setIsChannelLoader(true));
    try {
        const response = await api.get(`${BASE_URL}channel/channel`);

        if (response.data && response.data.channel) {
            dispatch(setAllChannel(response.data.channel));
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch channel details.");
    } finally {
        dispatch(setIsChannelLoader(false));
    }
};

export const getChannelById = (channelId) => async (dispatch) => {
    dispatch(setIsChannelLoader(true));
    try {
        const response = await api.get(`${BASE_URL}channel/channel/${channelId}`);

        if (response.data && response.data.channel) {
            dispatch(setChannel(response.data.channel));
            // message.success(response.data.message || "Channel retrieved successfully.");
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch channel details.");
    } finally {
        dispatch(setIsChannelLoader(false));
    }
};

export const updateChannel = (channelId, updatedData) => async (dispatch) => {
    dispatch(setIsChannelLoader(true));
    try {
        const response = await api.put(`${BASE_URL}channel/channel/${channelId}`, updatedData);

        if (response.data && response.data.message) {
            message.success(response.data.message);
            dispatch(getChannelById(channelId));
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to update channel.");
    } finally {
        dispatch(setIsChannelLoader(false));
    }
};

export const { setIsChannelLoader, setChannel,setAllChannel } = ChannelSlice.actions;
export default ChannelSlice.reducer;