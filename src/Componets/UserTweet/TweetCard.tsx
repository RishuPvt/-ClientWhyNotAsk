import React from 'react';

// Defining the TweetCardProps interface with an optional media field
interface TweetCardProps {
  username: string;
  title: string;
  description: string;
  tags: string[];
  media?: string; // Optional field for media URL (image or video)
}

// TweetCard Component
const TweetCard: React.FC<TweetCardProps> = ({ username, title, description, tags, media }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      {/* User Information */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-gray-600 font-bold text-lg">{username.charAt(0).toUpperCase()}</span>
        </div>
        <div className="text-lg font-bold text-gray-800">@{username}</div>
      </div>

      {/* Tweet Content */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>

      {/* Media Section */}
      {media && (
        <div className="mt-4">
          <img src={media} alt="Tweet Media" className="w-full rounded-lg" />
        </div>
      )}

      {/* Tags */}
      <div className="mt-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Defining the TweetCardProp component
const TweetCardProp: React.FC = () => {
  const tweetData = {
    username: 'rishu',
    title: 'React is Awesome!',
    description: 'I just learned how to build reusable components in React. It\'s super fun!',
    tags: ['React', 'JavaScript', 'Frontend'],
    media: 'https://th.bing.com/th/id/OIP.pkMC7q8lIFppDZo0ckg6agHaEo?rs=1&pid=ImgDetMain', // URL for the media (image)
  };

  return (
    <div className="container mx-auto mt-6">
      {/* Passing the tweetData as props to TweetCard */}
      <TweetCard 
        username={tweetData.username} 
        title={tweetData.title} 
        description={tweetData.description} 
        tags={tweetData.tags} 
        media={tweetData.media} // Passing media prop
      />
    </div>
  );
};

export default TweetCardProp;
