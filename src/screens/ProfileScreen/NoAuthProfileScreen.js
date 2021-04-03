import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import Typography from "../../components/Typography";
import { PROFILE_SCREEN_LOGIN_SCREEN } from "../../routers/ProfileRouter/names";

const NoAuthProfileScreen = ({ navigation }) => {
  return (
    <View>
      <Typography>No auth profile screnlol</Typography>
      <TouchableOpacity
        onPress={() => navigation.navigate(PROFILE_SCREEN_LOGIN_SCREEN)}
      >
        <Typography>dsadsa</Typography>
      </TouchableOpacity>
    </View>
  );
};

export default NoAuthProfileScreen;
