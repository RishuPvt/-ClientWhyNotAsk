import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

const Header: React.FC = () => {
  const list = [
    { Name: "Home", path: "/home" },
    { Name: "Tweet", path: "/tweet" },
    { Name: "My Tweet", path: "/mytweet" },
    { Name: "Category", path: "/category" },
    { icon: <FaUser />, Name: "Profile", path: "/profile" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">WhyNotAsk</div>
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
                  {/* Icon */}
                  {item.icon && <span className="text-xl">{item.icon}</span>}
                  {/* Text */}
                  <span>{item.Name}</span>
                </li>
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
