import { message } from "antd";
import axios from "axios";
import { BASE_URL } from "../index/utils";


export const api = axios.create({
  baseURL: BASE_URL,
});

// Adding a request interceptor to set the Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("youTubeToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response; // Return the response if no error
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.status === 401) {
        // Unauthorized error - log out the user
        message.info("Expired");
        localStorage.clear();
        window.location.reload();
        // Perform logout action here, e.g., clearing local storage, redirecting to login page, etc.
      }
      message.destroy();
      message.error(error?.response?.data?.message);
      return Promise.reject(error.response.data); // Return the error response data
    } else if (error.request) {
      // The request was made but no response was received

      message.destroy();
      message.error("Server is not responding. Please try again later.");
      return Promise.reject(
        "Server is not responding. Please try again later."
      ); // Return custom error message
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("An unexpected error occurred:", error.message);
      return Promise.reject(
        "An unexpected error occurred. Please try again later."
      ); // Return custom error message
    }
  }
);

export default api;