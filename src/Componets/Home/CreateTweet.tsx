import React, { useState } from "react";
import { backendUrl } from "../API/Api";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

interface CreateTweet {
  title: string;
  description: string;
  tags: string;
  media?: string | null;
}

const TweetForm: React.FC = () => {
  const [formData, setFormData] = useState<CreateTweet>({
    title: "",
    description: "",
    tags: "",
  });
  const [media, setmedia] = useState<null | FileList>(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    {
      setFormData({ ...formData, [name]: value });
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
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("tags", formData.tags);

      if (media) {
        //@ts-ignore
        form.append("media", media);
      }

      const response = await axios.post(
        `${backendUrl}/Tweets/createTweet`,
        form,
        config
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Tweet posted successfully!");
        navigate("/home"); // Navigate to the home page
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to post the tweet. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black-to-br from-white-50 to-blue-50 dark:from-white-900 dark:to-gray-800 relative overflow-hidden">
        <Header />

        {/* Cubic lines background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="cubic-pattern"></div>

          {/* Overlay gradient for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray/50 dark:to-gray-900/50"></div>
        </div>

        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 z-index:10 relative ">
          <h2 className="text-2xl mb-4">
            Your thoughts are seeds; share them and watch ideas grow
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-medium mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="tags"
                className="block text-gray-700 font-medium mb-2"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comma separated"
                value={formData.tags}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="media"
                className="block text-gray-700 font-medium mb-2"
              >
                Media
              </label>
              <input
                type="file"
                id="media"
                name="media"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Posting..." : "Post tweet"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TweetForm;
