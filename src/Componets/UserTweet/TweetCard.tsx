import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../API/Api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

interface TweetCardProps {
  username: string;
  title: string;
  description: string;
  tags: string[];
  media?: string;
  avatar?: string;
  questionId: string;
  createdAt: string;
}

const TweetCard: React.FC<TweetCardProps> = ({
  username,
  title,
  description,
  tags,
  media,
  avatar,
  questionId,
  createdAt,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [updatedTweet, setUpdatedTweet] = useState({
    description: "",
    title: "",
  });

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    setLoading(true);
    try {
      const response = await axios.delete(
        `${backendUrl}/Tweets/deleteTweet/${questionId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Tweet deleted successfully!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete tweet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = () => {
    setPopupOpen(true);
    setMenuOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedTweet({ ...updatedTweet, [name]: value });
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.patch(
        ` ${backendUrl}/Tweets/UpdateTweet/${questionId}`,
        updatedTweet,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Tweet updated successfully!");
      setPopupOpen(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update tweet. Please try again."
      );
    }
  };

  return (
    <div className="max-w-full md:max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4 md:p-6 relative mb-4">
      {/* Menu Button */}
      <div className="absolute top-2 right-2">
        <button onClick={handleToggleMenu} className="focus:outline-none">
          ⋮
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
            <button
              onClick={handleDelete}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            >
              {loading ? "Deleting.." : "Delete"}
            </button>
            <button
              onClick={handleUpdateClick}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            >
              Update
            </button>
          </div>
        )}
      </div>

      {/* Tweet Content */}
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <Link to="/ownerprofile" >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-full flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="rounded-full w-full h-full"
              />
            ) : (
              <span className="text-gray-600 font-bold text-lg">
                {username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div className="text-sm md:text-lg font-bold text-gray-800">
            @{username}
          </div>
        </Link>
        </div>
        <Link to={`/TweetDetails/${questionId}`}>
          <h3 className="text-lg md:text-2xl font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            {description}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleString()}
          </p>

          {media && (
            <div className="mt-4">
              <img
                src={media}
                alt="Tweet Media"
                className="w-full rounded-lg"
              />
            </div>
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
        </Link>
      </div>

      {/* Update Popup */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Update Tweet</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={updatedTweet.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  value={updatedTweet.description}
                  name="description"
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const TweetCardProp: React.FC = () => {
  const [tweets, setTweets] = useState<TweetCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(`${backendUrl}/Tweets/getAllTweet`, {
          withCredentials: true,
        });
        const formattedTweets = response.data.data.map((tweet: any) => ({
          username: tweet.owner.username,
          title: tweet.title,
          description: tweet.description,
          tags: tweet.tags,
          media: tweet.media,
          avatar: tweet.owner.avatar,
          questionId: tweet.id,
          createdAt: tweet.createdAt,
        }));
        setTweets(formattedTweets);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Please log in.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 px-4">
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => (
          <TweetCard
            key={index}
            username={tweet.username}
            title={tweet.title}
            description={tweet.description}
            tags={tweet.tags}
            media={tweet.media}
            avatar={tweet.avatar}
            questionId={tweet.questionId}
            createdAt={tweet.createdAt}
          />
        ))
      ) : (
        <p className="text-center">No tweets available</p>
      )}
    </div>
  );
};

export default TweetCardProp;
