import { createSlice } from '@reduxjs/toolkit';
import { message } from "antd";
import api from "../../Api/Axios";
import { BASE_URL } from '../../index/utils';

const initialState = {
    isLogin: !!localStorage.getItem("youTubeToken"),
    isAuthLoader: false,
    userData: JSON.parse(localStorage.getItem("userData")) || [],
    user: [],
};

const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLogin(state, action) {
            state.isLogin = action.payload;
        },
        setIsAuthLoader(state, action) {
            state.isAuthLoader = action.payload;
        },
        setUserData(state, action) {
            state.userData = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        }
    }
});

export const RegisterUser = (userData) => async (dispatch) => {
    dispatch(setIsAuthLoader(true));
    try {
        const response = await api.post(`${BASE_URL}/signup`, userData);

        if (response.data && response.data.message) {
            message.success(response.data.message);
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to create user. Please try again.");
    } finally {
        dispatch(setIsAuthLoader(false));
    }
};


export const LoginUser = (credentials) => async (dispatch) => {
    dispatch(setIsAuthLoader(true));
    try {
        const response = await api.post(`${BASE_URL}/login`, credentials);

        if (response.data && response.data.token) {
            localStorage.setItem("youTubeToken", response.data.token);
            localStorage.setItem("userData", JSON.stringify(response.data.user));

            dispatch(setIsLogin(true));
            dispatch(setUserData(response.data.user));

            message.success(response.data.message);
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
        dispatch(setIsAuthLoader(false));
    }
};

export const fetchUserDetails = (userId) => async (dispatch) => {
    dispatch(setIsAuthLoader(true));
    try {
        const response = await api.get(`${BASE_URL}/user/${userId}`);

        if (response.data && response.data.user) {
            dispatch(setUser(response.data.user));
        }
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch user details.");
    } finally {
        dispatch(setIsAuthLoader(false));
    }
};

export const fetchUserName = (userId) => async (dispatch) => {
    dispatch(setIsAuthLoader(true));
    try {
        const response = await api.get(`${BASE_URL}/username/${userId}`);

        if (response.data && response.data.user) {
           return response.data.user
        }
        return "User"
    } catch (error) {
        message.error(error.response?.data?.message || "Failed to fetch user details.");
    } finally {
        dispatch(setIsAuthLoader(false));
    }
};

export const { setIsAuthLoader, setIsLogin, setUserData, setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
