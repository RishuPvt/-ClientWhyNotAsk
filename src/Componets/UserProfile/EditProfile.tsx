import { Link } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../API/Api";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

interface EditProfile {
  username: string;
  email: string;
  bio: string;
}

const UpdateDetails: React.FC = () => {
  const [formData, setFormData] = useState<EditProfile>({
    username: "",
    email: "",
    bio: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      console.log("final form data send " + formData);

      const response = await axios.patch(
        `${backendUrl}/users/updateAccountDetails`,
        formData,
        config
      );
      if (response.status === 200) {
        toast.success(
          response.data.message || "Account details updated successfully"
        );
        navigate("/profile");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to  updated Account details . Please try again.";
      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Update Account Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="fullName"
              >
                UserName
              </label>
              <input
                name="UserName"
                id="UserName"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter your UserName"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="phone"
              >
                bio
              </label>
              <input
                name="bio"
                id="bio"
                type="tel"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Enter your New Bio"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              >
                {loading ? "Updating..." : "Update Details"}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-base text-gray-600">
            Update Avatar{" "}
            <Link
              to="/update-UserAvatar"
              className="text-indigo-500 font-semibold cursor-pointer hover:underline hover:text-teal-600 transition duration-200"
            >
              Change Avatar
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default UpdateDetails;
