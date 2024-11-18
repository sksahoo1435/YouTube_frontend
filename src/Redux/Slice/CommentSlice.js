import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import api from "../../Api/Axios";
import { BASE_URL } from '../../index/utils';


const initialState = {
    commentLoader: false,
    comments: []
}


const CommentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {
        setCommentLoader(state, action) {
            state.commentLoader = action.payload;
        },
        setComments(state, action) {
            state.comments = action.payload;
        }
    }
})


export const addComment = (commentData) => async (dispatch) => {
    dispatch(setCommentLoader(true));
    try {
        const response = await api.post(`${BASE_URL}comment/`, commentData);
        if (response.data && response.data.comment) {
            dispatch(fetchComments(response.data.comment.videoId));
            message.success("Comment added successfully.");
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to add comment. Please try again.");
    } finally {
        dispatch(setCommentLoader(false));
    }
};


export const fetchComments = (videoId) => async (dispatch) => {
    dispatch(setCommentLoader(true));
    try {
        const response = await api.get(`${BASE_URL}comment/all/${videoId}`);
        if (response.data && response.data.comments) {
            dispatch(setComments(response.data.comments));
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch comments. Please try again.");
    } finally {
        dispatch(setCommentLoader(false));
    }
};


export const fetchCommentById = (commentId) => async (dispatch) => {
    dispatch(setCommentLoader(true));
    try {
        const response = await api.get(`${BASE_URL}comment/${commentId}`);
        if (response.data && response.data.comment) {
            return response.data.comment;
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch comment. Please try again.");
    } finally {
        dispatch(setCommentLoader(false));
    }
};


export const updateComment = (id, updatedData) => async (dispatch) => {
    dispatch(setCommentLoader(true));
    try {
        const response = await api.put(`${BASE_URL}comment/${id}`, updatedData);
        if (response.data && response.data.comment) {
            dispatch(fetchComments(response.data.comment.videoId));
            message.success("Comment updated successfully.");
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to update comment. Please try again.");
    } finally {
        dispatch(setCommentLoader(false));
    }
};


export const deleteComment = (commentId) => async (dispatch) => {
    dispatch(setCommentLoader(true));
    try {
        const response = await api.delete(`${BASE_URL}comment/${commentId}`);
        if (response.data && response.data.message) {
            const videoId = response.data.comment.videoId;
            dispatch(fetchComments(videoId));
            message.success("Comment deleted successfully.");
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to delete comment. Please try again.");
    } finally {
        dispatch(setCommentLoader(false));
    }
};


export const { setCommentLoader, setComments } = CommentSlice.actions;
export default CommentSlice.reducer;