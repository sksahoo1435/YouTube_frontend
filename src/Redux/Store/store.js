import { configureStore } from '@reduxjs/toolkit';
import videoReducer from '../Slice/VideoSlice';
import authReducer from '../Slice/AuthSlice';
import channelReducer from '../Slice/ChannelSlice';
import commentReducer from '../Slice/CommentSlice';

export const Store = configureStore({
    reducer: {
        videos: videoReducer,
        auth: authReducer,
        channel: channelReducer,
        comment: commentReducer
    }
})