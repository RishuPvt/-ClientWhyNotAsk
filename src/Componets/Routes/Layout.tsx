import React from "react";
import Header from "../Header/Header";
import TweetCardProp from "../UserTweet/TweetCard";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black-to-br from-white-50 to-blue-50 dark:from-white-900 dark:to-gray-800 relative overflow-hidden">
      {/* Cubic lines background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="cubic-pattern"></div>
        
        {/* Overlay gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray/50 dark:to-gray-900/50"></div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="">
            <TweetCardProp />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;