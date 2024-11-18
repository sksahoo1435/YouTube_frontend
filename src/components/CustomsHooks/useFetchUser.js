import { useState, useEffect } from 'react';
import { message } from "antd";
import axios from "../../Api/Axios";
import { BASE_URL } from '../../index/utils';

const useFetchUser = (userId) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BASE_URL}/username/${userId}`);
                
                if (response.data && response.data.user) {
                    setUser(response.data.user);
                    message.success(response.data.message || "User fetched successfully!");
                }
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch user data.");
                message.error(error.response?.data?.message || "Failed to fetch user data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    return { user, isLoading, error };
};

export default useFetchUser;
