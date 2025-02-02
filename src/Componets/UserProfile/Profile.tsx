import { FaUserEdit, FaSignOutAlt, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../API/Api";
import toast from "react-hot-toast";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner5 from "../UI/Spinner";
import { useUserStore } from "../Zustand/zustandstore";

interface User {
  username: string;
  email: string;
  bio: string;
  avatar?: string;
  fullName: string;
}

const UserProfile: React.FC = () => {
  const userStore = useUserStore()
  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/users/getCurrentUser`, {
          withCredentials: true,
        });
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

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setloading(false);
    try {
      const response = await axios.post(
        `${backendUrl}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      useUserStore.getState().setUser({
        username: "",
        id: "",
        isAuth: false,
      });
      console.log(useUserStore.getState());
      toast.success(response.data.message || "User logout successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to logout. Please try again."
      );
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return <Spinner5 />;
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <div className="container mx-auto px-4 py-10">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-8 mb-10 transition-transform duration-300 hover:scale-105">
          <div className="flex flex-col items-center md:items-start md:w-1/4 mb-6 md:mb-0">
            <img
              src={user?.avatar}
              alt={user?.username}
              className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-300"
            />
            <Link to="/update-account">
              <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition duration-200 flex items-center">
                <FaUserEdit className="mr-2" /> Edit Profile
              </button>
            </Link>
          </div>

          <div className="md:w-3/4 md:pl-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {user?.fullName}
            </h2>
            <p className="text-gray-500 text-lg mb-4">@{user?.username}</p>
            <div className="mt-6 text-gray-700 space-y-3">
              <p className="flex items-center">
                <span className="font-semibold text-blue-700 w-24">Email:</span>
                <span>{user?.email}</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-blue-700 w-24">Bio:</span>
                <span>{user?.bio}</span>
              </p>
            </div>

            {/* Change Password and Logout Buttons */}
            <div className="flex space-x-4 mt-8">
              <button
                onClick={handleLogout}
                disabled={loading}
                className="px-5 py-2 bg-red-500 text-white rounded-full font-medium shadow-md hover:bg-red-600 transition duration-200 flex items-center"
              >
                <FaSignOutAlt className="mr-2" />{" "}
                {loading ? "Logging Out..." : "LogOut"}
              </button>
              <Link to="/change-password">
                <button className="px-5 py-2 bg-yellow-500 text-white rounded-full font-medium shadow-md hover:bg-yellow-600 transition duration-200 flex items-center">
                  <FaKey className="mr-2" /> Change Password
                </button>
              </Link>
            </div>
          </div>
          {userStore.isAuth===true ?(
          <span className="w-[30px] h-[30px] object-cover rounded-full shadow-lg border-4 border-blue-300 bg-green-500">
          </span>
          ):(
            <span className="w-[30px] h-[30px] object-cover rounded-full shadow-lg border-4  bg-orange-500">
          </span>

          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
