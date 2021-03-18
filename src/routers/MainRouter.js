import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import NoAuthRouter from "./NoAuthRouter";

const MainRouter = () => {
  const username = useSelector((state) => state.person.username);

  const token = useSelector((state) => state.person.token);

  function isLoggedIn() {
    // Person is logged in if there are valid username and password
    // info in the redux store
    return username.length > 0 && token.length > 0;
  }

  return isLoggedIn() ? (
    <View style={{ height: 100, width: 100, backgroundColor: "green" }}></View>
  ) : (
    <NoAuthRouter />
  );
};

export default MainRouter;
