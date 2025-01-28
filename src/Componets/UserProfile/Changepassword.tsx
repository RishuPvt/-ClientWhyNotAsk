import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../API/Api";
import { useNavigate } from "react-router-dom";
interface Password {
  oldPassword: string;
  newPassword: string;
}

const Changepassword: React.FC = () => {
  const [FormData, setFormData] = useState<Password>({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setloading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json", // Send as JSON
        },
        withCredentials: true, 
      };

      const response = await axios.post(
        `${backendUrl}/users/changeCurrentPassword`,
        {
          oldPassword: FormData.oldPassword,
          newPassword: FormData.newPassword,
        },
        config
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Password changed successfully");
        navigate("/profile"); // Navigate to the dashboard
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to change Password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Change Password
          </h2>
          <form method="post" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                id="oldPassword"
                value={FormData.oldPassword}
                onChange={handleInputChange}
                placeholder="Enter Old Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={FormData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Changepassword;
