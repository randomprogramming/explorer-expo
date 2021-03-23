import React, { useState } from "react";
import { View, Image, Dimensions, TouchableOpacity } from "react-native";
import Typography from "../../components/Typography";
import { useSelector, useDispatch } from "react-redux";
import Camera from "../../components/Camera";
import {
  appendMediaToState,
  setCoordinates,
  setTitle,
} from "../../reducers/addLocationReducer";
import Container from "../../components/Container";
import styles from "./styles";
import pxGenerator from "../../helpers/pxGenerator";
import useTheme from "../../hooks/useTheme";
import Icon from "../../components/Icon";
import CustomTextInput from "../../components/CustomTextInput";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import MapView, { Marker } from "react-native-maps";
import Switch from "../../components/Switch";
import BigButton from "../../components/BigButton";
import { handleAddLocation } from "../../actions/addLocationActions";

const ENTER_MANUALLY = "ENTER_MANUALLY_KEY";
const CURRENT_LOCATION = "USE_CURRENT_LOCATION_KEY";
const SWITCH_COMPONENTS = [
  { key: ENTER_MANUALLY, text: "Enter manually" },
  { key: CURRENT_LOCATION, text: "Use current location" },
];

const AddLocationMainScreen = ({ navigation }) => {
  const media = useSelector((state) => state.addLocation.media);
  const title = useSelector((state) => state.addLocation.title);
  const selectedLatitude = useSelector(
    (state) => state.addLocation.selectedLatitude
  );
  const selectedLongitude = useSelector(
    (state) => state.addLocation.selectedLongitude
  );
  const isUploadingLocation = useSelector(
    (state) => state.addLocation.isUploadingLocation
  );

  const [activeSwitchComponent, setActiveSwitchComponent] = useState(null);
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

  function handleMapPress(coordinates) {
    if (activeSwitchComponent === ENTER_MANUALLY) {
      dispatch(setCoordinates(coordinates));
    }
  }

  function handleAddLocationPress() {
    dispatch(handleAddLocation());
  }

  function isLocationSelected() {
    if (activeSwitchComponent === ENTER_MANUALLY) {
      return selectedLongitude && selectedLongitude;
    } else {
      // TODO: Figure out what to do when automatic location is selected
      return true;
    }
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
            <View key={picture.uri} style={styles.shadow}>
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
      <View style={styles.containerSpacer}>
        <Typography fontWeight="semi-bold" fontSize={20}>
          Location
        </Typography>
        <Switch
          style={{ marginVertical: pxGenerator(3) }}
          components={SWITCH_COMPONENTS}
          onChange={setActiveSwitchComponent}
        />
        {/* TODO: read the docs for mapview, NSLocationWhenInUseUsageDescription has to be added and some api keys or smthing */}
        {/* Excuse the mess here, we have to use overflow: hidden, but iOS doesnt like when you use overflow with shadows */}
        <View style={[styles.shadow, styles.borderRadius]}>
          <View style={[styles.mapContainer, styles.borderRadius]}>
            <MapView
              provider={undefined}
              showsMyLocationButton={true}
              showsScale={false}
              style={{
                flex: 1,
                minHeight: Dimensions.get("window").height / 3,
              }}
              onPress={(event) => handleMapPress(event.nativeEvent.coordinate)}
            >
              {selectedLongitude &&
                selectedLatitude &&
                activeSwitchComponent === ENTER_MANUALLY && (
                  <Marker
                    coordinate={{
                      latitude: selectedLatitude,
                      longitude: selectedLongitude,
                    }}
                  />
                )}
            </MapView>
          </View>
        </View>
      </View>
      <View>
        <BigButton
          title="Add Location"
          onPress={handleAddLocationPress}
          // if the location is being uploaded or there is no location selected on the map, disable the button
          disabled={isUploadingLocation || !isLocationSelected()}
        />
      </View>
    </ScrollViewContainer>
  );
};

export default AddLocationMainScreen;
