import React from "react";
import { useSelector } from "react-redux";
import Typography from "../../components/Typography";
import ProfileScreen from "../../screens/ProfileScreen";

const ProfileScreenNoAuthRouter = () => {
  return <Typography>Profile screen no auth</Typography>;
};

const ProfileRouter = () => {
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

  return isLoggedIn ? <ProfileScreen /> : <ProfileScreenNoAuthRouter />;
};

export default ProfileRouter;
