import React from "react";
import { View } from "react-native";
import SearchBar from "../../components/SearchBar";
import Typography from "../../components/Typography";
import styles from "./styles";

const index = () => {
  return (
    <View>
      <Typography>Search screen</Typography>
      <SearchBar />
    </View>
  );
};

export default index;
