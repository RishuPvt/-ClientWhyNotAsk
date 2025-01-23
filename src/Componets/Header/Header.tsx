import React from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaHome, FaPen, FaList } from "react-icons/fa";

const Header: React.FC = () => {
  const list = [
    { Name: "Home", path: "/home", icon: <FaHome /> },
    { Name: "Tweet", path: "/tweet", icon: <FaPen /> },
    { Name: "My Tweet", path: "/mytweet", icon: <FaList /> },
    { Name: "Category", path: "/category", icon: <FaList /> },
    { Name: "Profile", path: "/profile", icon: <FaUser /> },
  ];

  return (
    <header className="bg-black text-white shadow-lg md:opacity-[0.5]">
      <div className="container mx-auto p-4 flex justify-between items-center hidden md:flex">
        {/* Hide title on mobile */}
        <div className="text-2xl font-bold tracking-wide hidden md:block">
          WhyNotAsk
        </div>
        <nav>
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium uppercase text-sm">
            {list.map((item, index) => (
              <NavLink
                to={item.path}
                key={index}
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-bold border-b-2 border-white"
                    : "text-gray-300 hover:text-white"
                }
              >
                <li className="p-2 cursor-pointer hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300 rounded-md flex items-center space-x-2">
                  <span>{item.Name}</span>
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
        <ul className="flex justify-around items-center py-2">
          {list.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-300 hover:text-white"
              }
            >
              <li className="flex flex-col items-center">
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.Name}</span>
              </li>
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
