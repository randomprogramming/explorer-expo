import React from "react";
import { View } from "react-native";
import Typography from "../../components/Typography";
import { useSelector } from "react-redux";
import Camera from "../../components/Camera";

const AddLocationMainScreen = () => {
  const media = useSelector((state) => state.addLocation.media);

  return media.length === 0 ? (
    <View style={{ flex: 1 }}>
      <Camera />
    </View>
  ) : (
    <View>
      <Typography>Add location main</Typography>
    </View>
  );
};

export default AddLocationMainScreen;
