import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../UserAuth/Login";
import Register from "../UserAuth/Register";
import TweetForm from "../Home/CreateTweet";
import Layout from "./Layout";
import Profile from "../UserProfile/Profile";
import TweetCategoryCard from "../Categoery/Categoery";
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
      </Routes>
    </Router>
  );
};

export default ProfileRouter;
