import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { backendUrl } from "../API/Api";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
interface Avatar {
  avatar?: File | null;
}


const ChangeAvatar: React.FC = () => {

  const [formData, setFormData] = useState<Avatar>({
  avatar : null

  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFormData({ ...formData, avatar: files ? files[0] : null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setloading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      if (!formData.avatar) {
        toast.error("Please upload an avatar.");
        setloading(false);
        return;
      }

      const form = new FormData();
      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }
      
  
      const response = await axios.patch(
        `${backendUrl}/users/updateUserAvatar`,
        form,
        config
      );
      if (response.status === 200) {
        toast.success(
          response.data.message || "User Avatar Update successful!"
        );
        navigate("/profile"); // Navigate to the dashboard or target page
      }
      // toast.success(response.data.message || "User Avatar Update successful!");
      // navigate("/");
    } catch (error : any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to Update Avatar. Please try again.";
      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  }

  return (
    <>
    <Header/>
      <div className="mt-[15px] flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-xl max-w-md mx-auto border border-gray-200">
        <form onSubmit={handleSubmit} className="w-full" >
          {/* Label for Avatar */}
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-800 mb-2"
          >
            Upload Profile Picture
          </label>

          {/* File Input */}
          <input
            id="avatar"
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update
            </button>
          </div>
        </form>

        {/* Footer Text with NavLink */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Update Account Details{" "}
          <Link
            to="/update-account"
            className="text-indigo-500 font-semibold hover:underline hover:text-indigo-600 transition duration-200"
          >
            {loading ? "Updating..." : "Update Avatar"}
          </Link>
        </p>
      </div>
    </>
  );
}


export default ChangeAvatar;
