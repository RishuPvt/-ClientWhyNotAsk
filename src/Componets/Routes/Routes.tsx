import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../UserAuth/Login";
import Register from "../UserAuth/Register";
import TweetForm from "../Home/CreateTweet";
import Layout from "./Layout";
import Profile from "../UserProfile/Profile";
import TweetCategoryCard from "../Categoery/Categoery";
import MyTweetCard from "../Tweet/MyTweet";
import UpdateDetails from "../UserProfile/EditProfile";
import ChangeAvatar from "../UserProfile/Editavatar";
import Changepassword from "../UserProfile/Changepassword";
import TweetDetails from "../Tweet/TweetDetails";
const ProfileRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Layout />} />
        <Route path="/tweet" element={<TweetForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Category" element={<TweetCategoryCard />} />
        <Route path="/mytweet" element={<MyTweetCard />} />
        <Route path="/Update-account" element={<UpdateDetails />} />
        <Route path="/update-UserAvatar" element={<ChangeAvatar />} />
        <Route path="/Change-password" element={<Changepassword />} />
        <Route path="/TweetDetails" element={<TweetDetails />} />




      </Routes>
    </Router>
  );
};

export default ProfileRouter;
