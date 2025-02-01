import React, { useState, useEffect, FC } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Header from "../Header/Header";
import axios from "axios";
import { backendUrl } from "../API/Api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUserStore } from "../Zustand/zustandstore";
interface Comment {
  id: string;
  owner: string;
  createdAt: string;
  content: string;
  media?: string;
  avatar?: string;
  username: string;
}

interface TweetDetailsProps {
  username: string;
  title: string;
  description: string;
  tags: string[];
  media?: string;
  avatar?: string;
  createdAt: string;
  questionId: string;
  comment: Comment[];
  id: string;
}

// TweetDetails component displays individual tweet and its comments
const TweetDetails: FC<TweetDetailsProps> = ({
  username,
  title,
  description,
  tags,
  media,
  avatar,
  createdAt,
  questionId,
  comment,
  id,
}) => {
  const userStore = useUserStore();
  const [popupOpen, setPopupOpen] = useState(false);
  const [mediadata, setmedia] = useState<null | FileList>(null);
  const [Loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState();
  const navigate = useNavigate();
  const [formData, setform] = useState({
    content: "",
    media: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    {
      setform({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files[0];
    setmedia(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const form = new FormData();
      form.append("content", formData.content);

      if (mediadata) {
        //@ts-ignore
        form.append("media", mediadata);
      }

      const response = await axios.post(
        `${backendUrl}/comments/CreateComment/${questionId}`,
        form,
        config
      );

      if (response.status === 201) {
        toast.success(response.data.message || "Tweet posted successfully!");
        navigate(`/TweetDetails/${questionId}`);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${backendUrl}/comments/DeleteComment/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Comment Deleted successful!");
      navigate(`/TweetDetails/${questionId}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to logout. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    console.log(answer);

    setLoading(true);
    try {
      const response = await axios.patch(
        `${backendUrl}/comments/UpdateComment/${answer}`,
        {
          content: formData.content,
        },

        {
          withCredentials: true,
        }
      );
      setform(response.data.data);
      toast.success(response.data.message || "Comment Updated successful!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to Update. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tweet-card border p-6 rounded-lg shadow-lg bg-white w-full h-full max-w-4xl mx-auto my-6">
      {/* User avatar or initial */}
      <div className="flex items-center space-x-4 mb-4">
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
        <div className="text-sm md:text-lg  text-gray-800">@{username}</div>
      </div>
      <span className="text-xs text-gray-500">
        {new Date(createdAt).toLocaleString()}
      </span>
      {/* Tweet title */}
      <h2 className="tweet-title text-2xl font-bold text-gray-900 mt-4">
        {title}
      </h2>

      {media && (
        <img
          src={media}
          alt="Tweet Media"
          className="tweet-media mt-4 rounded-lg w-[60%]"
        />
      )}

      {/* Tweet description */}
      <p className="tweet-content text-lg text-gray-800 mt-4">{description}</p>

      {/* Tags */}
      <div className="tweet-tags mt-4 flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="tag text-blue-600 rounded-full px-3 py-1 text-sm mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Comments section */}
      <div className="comments-section mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>

        {/* Check for comments */}
        {comment.length > 0 ? (
          comment.map((comment) => (
            <div
              key={comment.id}
              className="comment bg-gray-100 p-4 mb-4 rounded-lg"
            >
              {/* Comment owner details */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 flex flex-col items-baseline">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    {comment.owner.avatar ? (
                      <img
                        src={comment.owner.avatar}
                        alt="Comment Owner Avatar"
                        className="rounded-full w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-600 font-bold text-sm">
                        {comment.owner.username.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold">
                    @{comment.owner.username}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Comment action buttons */}
                <div className="flex space-x-2">
                  {userStore.id === id ? (
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(comment.id)}
                      disabled={Loading}
                    >
                      <MdDelete size={20} />
                    </button>
                  ) : null}
                  {userStore.id === id ? (
                    <button
                      onClick={() => {
                        setPopupOpen(true);
                        setAnswer(comment.id);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit size={20} />
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Optional media within comment */}
              {comment.media && (
                <img
                  src={comment.media}
                  alt="Comment Media"
                  className="comment-media mt-2 rounded-lg w-56"
                />
              )}

              {/* Comment content */}
              <p className="text-gray-700 mt-2">{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Write your comment..."
          onChange={handleInputChange}
          name="content"
          id="content"
          value={formData.content}
        ></textarea>
        <input
          type="file"
          id="media"
          name="media"
          onChange={handleFileChange}
          accept="image/*"
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {Loading ? "Submiting.." : "Submit"}
        </button>
      </form>

      {/* Update Popup */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Update Tweet</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Comment
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {Loading ? "Updating..." : "update"}
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

const TweetList: FC = () => {
  const [tweet, setTweet] = useState<TweetDetailsProps | null>(null);
  const [loading, setLoading] = useState(true);
  const { questionId } = useParams<{ questionId: string }>();
  const [comment, setComment] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/Tweets/getTweetbyId/${questionId}`,
          {
            withCredentials: true,
          }
        );

        const formattedTweet = {
          username: response.data.data.owner.username,
          title: response.data.data.title,
          description: response.data.data.description,
          tags: response.data.data.tags,
          media: response.data.data.media,
          avatar: response.data.data.owner.avatar,
          createdAt: response.data.data.createdAt,
          questionId: response.data.data.id,
          id: response.data.data.ownerId,
          comment: [],
        };

        setTweet(formattedTweet);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Please log in.";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/comments/getAllComment/${questionId}`,
          { withCredentials: true }
        );
        setComment(response.data.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error fetching comments");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [questionId]);

  if (loading) {
    return <Loader />;
  }

  if (!tweet) {
    return <p>Tweet not found</p>;
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
        <div className="container mx-auto mt-6 px-4 z-index[10] relative">
          <TweetDetails {...tweet} comment={comment} />
        </div>
      </div>
    </>
  );
};

export default TweetList;
