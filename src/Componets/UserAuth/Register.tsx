import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../API/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface RegisterFormData {
  username: string;
  password: string;
  email: string;
  bio: string;
  avatar?: string | null;
  fullName: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    fullName: "",
    password: "",
    email: "",
    avatar: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFormData({ ...formData, avatar: files ? files[0]?.name : "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const form = new FormData();
      form.append("username", formData.username);
      form.append("bio", formData.bio);
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("password", formData.password);

      if (formData.avatar) {
        form.append("avatar", formData.avatar);
      }
      const response = await axios.post(
        `${backendUrl}/users/RegisterUser`,
        form,
        config
      );

      if (response.status === 200) {
        toast.success(response.data.message || "User registered successful!");
        navigate("/"); // Navigate to the login
      }
      toast.success(response.data.message || "User registered successfully!");
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to register. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full flex flex-col md:flex-row h-screen ">
      {/* login Up Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gray-100 rounded-t-lg md:rounded-l-lg md:rounded-t-none h-full relative">
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-12 text-center">
            #WhyNotAsk
          </h1>
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
            Great to see you again!
          </h2>
          <p className="text-gray-500 text-center font-extrabold mb-6">
            "Welcome back, we've missed you!"
          </p>
          <p className="text-gray-500 text-center font-extrabold mb-6 italic">
            "Reconnect with your Tweet!"
          </p>
          <div className="flex justify-center">
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              log in
            </Link>
          </div>
        </div>
      </div>

      {/* Sign Up Section */}
      <div
        className="w-full md:w-1/2 p-8 flex flex-col justify-center h-full relative"
        style={{
          backgroundImage:
            "url(https://www.rolley.io/images/backgrounds/rolley-shapes.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-6 w-full md:w-[80%] lg:w-[60%] flex flex-col justify-center mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-center mb-4">
            Create your account now!
          </h2>
          <p className="text-base text-gray-500 text-center mb-6">
            Be part of something amazing.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-bold mb-2"
              >
                FullName
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-gray-700 font-bold mb-2"
              >
                Bio
              </label>
              <input
                type="bio"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="block text-gray-700 font-bold mb-2"
              >
                Avatar (Optional)
              </label>

              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
