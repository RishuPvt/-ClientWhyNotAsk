import React, { useEffect, useState } from "react";
import Header from "../Header/Header2";
import axios from "axios";
import { backendUrl } from "../API/Api";
import Spinner5 from "../UI/Spinner";

interface CommentProps {
  username: string;
  title: string;
  description: string;
  tags: string[];
  media: string;
  avatar: string;
  tweetmedia: string;
  content: string;
  createdAt: string;
}

const CommentCard: React.FC<CommentProps> = ({
  username,
  title,
  description,
  tags,
  media,
  avatar,
  tweetmedia,
  createdAt,
  content,
}) => {
  return (
    <div className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg mb-7 w-[40%]  border-b-2 border-blue-500">
      {/* Tweet Details */}
      <div className="mb-4">
        <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
        {tweetmedia && (
          <img
            src={tweetmedia}
            alt="Tweet media"
            className="rounded-lg border border-gray-200 mb-2 w-2xl h-36 object-cover"
          />
        )}
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-4" />

      {/* User Comment Section */}
      <div className="flex items-center mb-4">
        <img
          src={avatar}
          alt={username}
          className="w-10 h-10 rounded-full border-2 border-blue-500 mr-3"
        />
        <div>
          <h4 className="font-medium text-sm text-gray-800">{username}</h4>
          <span className="text-xs text-gray-500">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      {media && (
        <img
          src={media}
          alt="User comment media"
          className="rounded-lg border border-gray-200 mb-3 w-[40%] h-36 object-cover"
        />
      )}
      <p className="text-sm text-gray-700">{content}</p>
    </div>
  );
};

const AllComments: React.FC = () => {
  const [comments, setcomment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchcomments = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/comments/getCommentByuser`,
          {
            withCredentials: true,
          }
        );
        const formattedComments = response.data.data.map((comments: any) => ({
          username: comments.owner.username,
          title: comments.question.title,
          description: comments.question.description,
          tags: comments.question.tags,
          media: comments.media,
          avatar: comments.owner.avatar,
          questionId: comments.question.id,
          createdAt: comments.createdAt,
          tweetmedia: comments.question.media,
          content: comments.content,
        }));
        setcomment(formattedComments);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchcomments();
  }, []);

  if (loading) {
    return <Spinner5 />;
  }
  return (
    <>
      <Header />
      <div className="container mx-auto mt-6 px-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentCard
              key={index}
              username={comment.username}
              title={comment.title}
              description={comment.description}
              tags={comment.tags}
              media={comment.media}
              avatar={comment.avatar}
              questionId={comment.questionId}
              createdAt={comment.createdAt}
              tweetmedia={comment.tweetmedia}
              content={comment.content}
            />
          ))
        ) : (
          <p className="text-center">No tweets available</p>
        )}
      </div>
    </>
  );
};

export default AllComments;
