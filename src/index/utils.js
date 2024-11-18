import { fetchUserName } from "../Redux/Slice/AuthSlice";

export const isMobileDevice = () => {
    return window.innerWidth < 768;
};


export const BASE_URL = 'https://youtube-backend-gray.vercel.app/'



export const getUserDetails = async (userId, dispatch) => {
    try {
        const user = await dispatch(fetchUserName(userId));
        if (user) {
            const { username, profilePic } = user;
            return { username, profilePic };
        }
        return { username: "User", profilePic: null };
    } catch (error) {
        console.error("Error fetching user details:", error);
        return { username: "User", profilePic: null };
    }
};
