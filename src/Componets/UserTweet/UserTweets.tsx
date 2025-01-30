import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../API/Api";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

interface Tweet {
  id: number;
  username: string;
  avatar: string;
  title: string;
  description: string;
  media?: string;
  tags: string[];
  createdAt: string;
}

const TweetCard: React.FC<Tweet> = ({
  username,
  title,
  description,
  tags,
  media,
  avatar,
  createdAt,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-6 flex">
        <img
          className="h-12 w-12 rounded-full border-2 border-blue-500"
          src={avatar}
          alt={`${username}'s avatar`}
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">@{username}</h3>
          <h4 className="text-xl font-bold text-gray-800">{title}</h4>
          <p className="text-gray-700 mt-2">{description}</p>
          <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleString()}
          </p>
          {media && (
            <img
              className="mt-4 rounded-lg max-h-60 w-full object-cover"
              src={media}
              alt="Tweet media"
            />
          )}
             <div className="mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block  text-blue-800 text-xs md:text-sm px-3 py-1 rounded-full mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TweetList = () => {
  const [tweets, settweets] = useState<Tweet[]>([]);
  const [loading, setloading] = useState(true);
  const location = useLocation();
  const userId = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Tweets/getAllTweetbyUser/${userId}`,
          {
            withCredentials: true,
          }
        );
        const formattedTweets = response.data.data.map((tweet: any) => ({
          id: tweet.id,
          username: tweet.owner.username,
          title: tweet.title,
          description: tweet.description,
          tags: tweet.tags,
          media: tweet.media,
          avatar: tweet.owner.avatar,
          createdAt: tweet.createdAt,
        }));
        settweets(formattedTweets);
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Please log in.";
        toast.error(errorMessage);
      } finally {
        setloading(false);
      }
    };
    fetchTweet();
  }, [userId]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    
    <div className="max-w-[60rem] mx-auto mt-8 relative">
      {tweets && tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <TweetCard
            key={index}
            id={tweet.id}
            username={tweet.username}
            title={tweet.title}
            description={tweet.description}
            tags={tweet.tags}
            media={tweet.media}
            avatar={tweet.avatar}
            createdAt={tweet.createdAt}
          />
        ))
      ) : (
        <p className="text-center">No tweets available</p>
      )}
    </div>
  );
};

export default TweetList;
