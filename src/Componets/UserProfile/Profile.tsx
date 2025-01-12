import { FaUserEdit, FaSignOutAlt, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const UserProfile = () => {
  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-10">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-8 mb-10 transition-transform duration-300 hover:scale-105">
          <div className="flex flex-col items-center md:items-start md:w-1/4 mb-6 md:mb-0">
            <img
              src="https://via.placeholder.com/150"
              alt="avatar"
              className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-blue-300"
            />
            <Link to="/update-account">
              <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition duration-200 flex items-center">
                <FaUserEdit className="mr-2" /> Edit Profile
              </button>
            </Link>
          </div>

          <div className="md:w-3/4 md:pl-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Full Name</h2>
            <p className="text-gray-500 text-lg mb-4">@username</p>
            <div className="mt-6 text-gray-700 space-y-3">
              <p className="flex items-center">
                <span className="font-semibold text-blue-700 w-24">Email:</span>
                <span>email@example.com</span>
              </p>
              <p className="flex items-center">
                <span className="font-semibold text-blue-700 w-24">Bio:</span>
                <span>This is a brief bio about the user.</span>
              </p>
            </div>

            {/* Change Password and Logout Buttons */}
            <div className="flex space-x-4 mt-8">
              <button className="px-5 py-2 bg-red-500 text-white rounded-full font-medium shadow-md hover:bg-red-600 transition duration-200 flex items-center">
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
              <Link to="/change-password">
                <button className="px-5 py-2 bg-yellow-500 text-white rounded-full font-medium shadow-md hover:bg-yellow-600 transition duration-200 flex items-center">
                  <FaKey className="mr-2" /> Change Password
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
