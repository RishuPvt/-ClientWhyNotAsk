import React, { useEffect, useState } from "react";
import TweetCard from "../UserTweet/UserTweets";
import Header from "../Header/Header";
import axios from "axios";
import { backendUrl } from "../API/Api";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Spinner5 from "../UI/Spinner";

interface UserProfileProps {
  username: string;
  bio: string;
  avatar?: string;
  fullName: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  avatar,
  username,
  fullName,
  bio,
}) => {
  return (
    <div className="w-[40%] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden relative">
    {/* Header Section */}
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-500 to-blue-700 p-6">
      <img
        className="h-28 w-32 rounded-full border-4 border-white shadow-lg"
        src={avatar}
        alt={`${username}'s avatar`}
      />
      <h2 className="mt-4 text-2xl font-semibold text-white">{fullName}</h2>
      <p className="text-lg text-blue-200">@{username}</p>
    </div>
    
    {/* Bio Section */}
    <div className="px-6 py-5">
      <p className="text-gray-700 text-center text-lg leading-relaxed">{bio}</p>
    </div>
    
    {/* Action Buttons */}
    <div className="px-6 py-4 flex justify-between">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md">
        Follow
      </button>
      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-full transition-all duration-300 shadow-md">
        Message
      </button>
    </div>
  </div>
  
  );
};

const App = () => {
  const [user, setUser] = useState<UserProfileProps | null>(null);
  const [loading, setloading] = useState(true);
  const location = useLocation();
  const userId = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/users/getUserbyId/${userId}`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.data);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Please Logged in..";
        toast.error(errorMessage);
      } finally {
        setloading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <Spinner5 />;
  }

  return (
    <>
       <div className="min-h-screen bg-black-to-br from-white-50 to-blue-50 dark:from-white-900 dark:to-gray-800 relative overflow-hidden">

        {/* Cubic lines background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cubic-pattern"></div>

          {/* Overlay gradient for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray/50 dark:to-gray-900/50"></div>
        </div>
        <div className="min-h-[450px] flex items-center justify-center">
          <UserProfile
            avatar={user?.avatar}
            username={user?.username}
            fullName={user?.fullName}
            bio={user?.bio}
          />
        </div>
      <TweetCard />

      </div>

    </>
  );
};

export default App;
