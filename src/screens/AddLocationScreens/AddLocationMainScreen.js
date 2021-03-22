import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import Typography from "../../components/Typography";
import { useSelector, useDispatch } from "react-redux";
import Camera from "../../components/Camera";
import {
  appendMediaToState,
  setTitle,
} from "../../reducers/addLocationReducer";
import Container from "../../components/Container";
import styles from "./styles";
import pxGenerator from "../../helpers/pxGenerator";
import useTheme from "../../hooks/useTheme";
import Icon from "../../components/Icon";
import CustomTextInput from "../../components/CustomTextInput";
import ScrollViewContainer from "../../components/ScrollViewContainer";

const AddLocationMainScreen = ({ navigation }) => {
  const media = useSelector((state) => state.addLocation.media);
  const title = useSelector((state) => state.addLocation.title);

  const [shouldShowCamera, setShouldShowCamera] = useState(true);

  const dispatch = useDispatch();

  const theme = useTheme();

  function handlePictureTaken(photo) {
    dispatch(appendMediaToState(photo));
    setShouldShowCamera(false);
  }

  function handleCancelButtonPress() {
    setShouldShowCamera(false);
  }

  // TODO: Add an animation for the camera sliding out of the screen
  // If the media is empty, we want the user to take a picture before they can proceed to the next screen
  // if (media.length === 0 || shouldShowCamera) {
  //   return (
  //     <Camera
  //       onPictureTaken={handlePictureTaken}
  //       // If there is media loaded, we want to show the cancel button, which only hides the camera and goes back to the
  //       // add location information
  //       onCancelPress={media.length === 0 ? undefined : handleCancelButtonPress}
  //       onBackButtonPress={navigation.goBack}
  //     />
  //   );
  // }

  // Take the height and width of the first image and use it as reference aspect ratio for the rest of the images
  // const aspectRatio = media[0].height / media[0].width;
  const aspectRatio = 1.5; // TODO: Remove this, its just for testing
  const imageRatio = 2.7;

  return (
    <ScrollViewContainer
      defaultPadding
      headerTitle="Add Location"
      useKeyboardAvoidView
    >
      <View style={styles.mediaContainer}>
        {media.map((picture) => {
          return (
            <View style={styles.shadow}>
              <Image
                source={{ uri: picture.uri }}
                style={[
                  {
                    height:
                      (Dimensions.get("window").width / imageRatio) *
                      aspectRatio,
                    width: Dimensions.get("window").width / imageRatio,
                  },
                  styles.imagesAndButtonCommon,
                ]}
                key={picture.uri}
              />
            </View>
          );
        })}
        {/* 
          This view MUST HAVE the same style as the other images. If we put
          the Dimension login the stylesheet, it won't re-render when user
          flips the device around, which is why it must be here.
        */}
        <TouchableOpacity
          onPress={() => setShouldShowCamera(true)}
          style={[
            {
              height:
                (Dimensions.get("window").width / imageRatio) * aspectRatio,
              width: Dimensions.get("window").width / imageRatio,
            },
            { borderColor: theme.accent.secondary },
            styles.imagesAndButtonCommon,
            styles.openCameraContainer,
          ]}
        >
          <Icon name="camera" size={50} color={theme.accent.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.containerSpacer}>
        <Typography fontWeight="semi-bold" fontSize={20}>
          Title
        </Typography>
        <CustomTextInput
          placeholder="Riverside spot for relaxing"
          value={title}
          onChange={(newValue) => dispatch(setTitle(newValue))}
        />
      </View>
    </ScrollViewContainer>
  );
};

export default AddLocationMainScreen;
