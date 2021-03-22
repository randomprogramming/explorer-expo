import React, { useState } from "react";
import { View } from "react-native";
import Typography from "../../components/Typography";
import { useSelector, useDispatch } from "react-redux";
import Camera from "../../components/Camera";
import { appendMediaToState } from "../../reducers/addLocationReducer";
import { TouchableOpacity } from "react-native-gesture-handler";

const AddLocationMainScreen = ({ navigation }) => {
  const media = useSelector((state) => state.addLocation.media);
  const [shouldShowCamera, setShouldShowCamera] = useState(true);

  const dispatch = useDispatch();

  function handlePictureTaken(photo) {
    dispatch(appendMediaToState(photo));
    setShouldShowCamera(false);
  }

  function handleCancel() {
    setShouldShowCamera(false);
  }

  // TODO: Add an animation for the camera sliding out of the screen
  // If the media is empty, we want the user to take a picture before they can proceed to the next screen
  if (media.length === 0 || shouldShowCamera) {
    return (
      <Camera
        onPictureTaken={handlePictureTaken}
        // If there is media loaded, we want to show the cancel button, which only hides the camera and goes back to the
        // add location information
        onCancelPress={media.length === 0 ? undefined : handleCancel}
        onBackButtonPress={navigation.goBack}
      />
    );
  }

  return (
    <View>
      <Typography>
        shouldShowCamera is false and state media is empty
      </Typography>
      <TouchableOpacity onPress={() => setShouldShowCamera(true)}>
        <Typography>Open cams</Typography>
      </TouchableOpacity>
    </View>
  );
};

export default AddLocationMainScreen;
