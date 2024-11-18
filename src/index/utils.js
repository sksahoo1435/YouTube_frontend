import { fetchUserName } from "../Redux/Slice/AuthSlice";

export const isMobileDevice = () => {
    return window.innerWidth < 768;
};


export const BASE_URL = 'http://localhost:4008'

export const vedioData = [
    {
        "videoId": "GEP76hqA1_I",
        "title": "The Future of AI in Business",
        "thumbnailUrl": "https://img.youtube.com/vi/GEP76hqA1_I/maxresdefault.jpg",
        "description": "An insightful discussion on how AI is transforming the business landscape.",
        "channelId": "businessinsights",
        "uploader": "Business Insights",
        "views": 20000,
        "likes": 1500,
        "dislikes": 50,
        "uploadDate": "2024-10-01",
        "comments": [
            {
                "commentId": "comment07",
                "userId": "userFrontendDev",
                "text": "Great explanation of CSS Grid! Thanks for the tips.",
                "timestamp": "2024-08-31T15:20:00Z"
            },
            {
                "commentId": "comment07",
                "userId": "userFrontendDev",
                "text": "Great explanation of CSS Grid! Thanks for the tips.",
                "timestamp": "2024-08-31T15:20:00Z"
            }
        ],
        "videoUrl": "https://www.youtube.com/watch?v=GEP76hqA1_I"
    },
    {
        "videoId": "Zo2uYxGEdaE",
        "title": "React Hooks: A Complete Guide",
        "thumbnailUrl": "https://img.youtube.com/vi/Zo2uYxGEdaE/maxresdefault.jpg",
        "description": "A comprehensive tutorial on React Hooks and how to use them effectively.",
        "channelId": "reacttutorials",
        "uploader": "React Tutorials",
        "views": 30000,
        "likes": 2200,
        "dislikes": 30,
        "uploadDate": "2024-09-15",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=Zo2uYxGEdaE"
    },
    {
        "videoId": "tGPZmChPpXQ",
        "title": "Node.js Crash Course",
        "thumbnailUrl": "https://img.youtube.com/vi/Zo2uYxGEdaE/maxresdefault.jpg",
        "description": "A crash course in Node.js covering the basics and beyond.",
        "channelId": "nodejschannel",
        "uploader": "Node.js Channel",
        "views": 45000,
        "likes": 3400,
        "dislikes": 60,
        "uploadDate": "2024-08-20",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=tGPZmChPpXQ"
    },
    {
        "videoId": "NR6OjlMfBPo",
        "title": "Mastering Python for Data Science",
        "thumbnailUrl": "https://img.youtube.com/vi/NR6OjlMfBPo/maxresdefault.jpg",
        "description": "Learn how to use Python for data analysis and visualization.",
        "channelId": "datascience",
        "uploader": "Data Science Tutorials",
        "views": 56000,
        "likes": 4100,
        "dislikes": 90,
        "uploadDate": "2024-07-30",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=NR6OjlMfBPo"
    },
    {
        "videoId": "6RiHpicS3VQ",
        "title": "Building Web Applications with Django",
        "thumbnailUrl": "https://img.youtube.com/vi/5vR1zQISj1g/maxresdefault.jpg",
        "description": "A guide to building robust web applications using Django.",
        "channelId": "django",
        "uploader": "Django Developers",
        "views": 72000,
        "likes": 5200,
        "dislikes": 100,
        "uploadDate": "2024-06-15",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=6RiHpicS3VQ"
    },
    {
        "videoId": "DvSOLGk_2Lg",
        "title": "CSS Grid Layout Crash Course",
        "thumbnailUrl": "https://img.youtube.com/vi/DvSOLGk_2Lg/maxresdefault.jpg",
        "description": "Learn how to use CSS Grid for responsive web design.",
        "channelId": "cssgrid",
        "uploader": "CSS Grid Master",
        "views": 39000,
        "likes": 2700,
        "dislikes": 40,
        "uploadDate": "2024-05-10",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=DvSOLGk_2Lg"
    },
    {
        "videoId": "icmRiXYMy6E",
        "title": "JavaScript Fundamentals",
        "thumbnailUrl": "https://img.youtube.com/vi/icmRiXYMy6E/maxresdefault.jpg",
        "description": "A beginner's guide to JavaScript, covering all the fundamentals.",
        "channelId": "jsfundamentals",
        "uploader": "JavaScript Master",
        "views": 48000,
        "likes": 3900,
        "dislikes": 70,
        "uploadDate": "2024-04-22",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=icmRiXYMy6E"
    },
    {
        "videoId": "4E2kY4YMsow",
        "title": "Top 10 React Tips and Tricks",
        "thumbnailUrl": "https://img.youtube.com/vi/4E2kY4YMsow/maxresdefault.jpg",
        "description": "Discover essential tips and tricks for mastering React.",
        "channelId": "reactmastery",
        "uploader": "React Mastery",
        "views": 63000,
        "likes": 4900,
        "dislikes": 80,
        "uploadDate": "2024-03-18",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=4E2kY4YMsow"
    },
    {
        "videoId": "5vR1zQISj1g",
        "title": "Understanding REST APIs",
        "thumbnailUrl": "https://img.youtube.com/vi/5vR1zQISj1g/maxresdefault.jpg",
        "description": "An introduction to REST APIs and how to build them.",
        "channelId": "restapi",
        "uploader": "API Developer",
        "views": 72000,
        "likes": 6200,
        "dislikes": 90,
        "uploadDate": "2024-02-12",
        "comments": [],
        "videoUrl": "https://www.youtube.com/watch?v=5vR1zQISj1g"
    }
];



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
