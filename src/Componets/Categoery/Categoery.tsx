import React from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

const TweetCategoryCard: React.FC = () => {
  const categories = [
    { name: "My Comments", description: "See your all comments here.", icon: "\ud83d\udd50", path:"/mycomments" },
    { name: "TweetTube", description: "Tips and trends for a better lifestyle.", icon: "\ud83c\udf1f" },
    { name: "Development", description: "Latest updates and tutorials in development.", icon: "\ud83d\udd27" },
    { name: "News", description: "Stay updated with the latest news.", icon: "\ud83d\udcf0" },
    { name: "Hackathons", description: "updated with latest hackathon events and challenges.", icon: "\ud83c\udf93" },
    { name: "Technology", description: "Discover the newest tech trends.", icon: "\ud83d\udcbb" },
  ];

  return (
    <>
    <Header />
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Choose Your Tweet Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
            <Link to={category.path}>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full font-medium shadow-md hover:bg-blue-700 transition duration-200">
              View {category.name}
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TweetCategoryCard;
