import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import * as Permissions from "expo-permissions";
import Typography from "../../components/Typography";
// import styles from "./styles";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";
import Container from "../../components/Container";
import BigButton from "../../components/BigButton";
import { ADD_LOCATION_SCREEN_MAIN } from "../../routers/AddLocationRouter/names";

// let camera;
const AddLocationInfoScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const media = useSelector((state) => state.addLocation.media);
  const camera = useRef();

  useEffect(() => {
    (async () => {
      const perm = await Permissions.getAsync(Permissions.CAMERA);
      setHasCameraPermission(perm.granted);
      setCanAskAgain(perm.canAskAgain);
      console.log(perm);
    })();
  }, []);

  async function askForCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
  }

  // if (!hasCameraPermission && canAskAgain) {
  //   return (
  //     <View>
  //       <Typography>No Permission</Typography>
  //     </View>
  //   );
  // }

  // if (!hasCameraPermission && !canAskAgain) {
  //   askForCameraPermission();
  //   return (
  //     <View>
  //       <Typography>
  //         Please allow the app to access the camera in your settings.
  //       </Typography>
  //     </View>
  //   );
  // }
  // media.length === 0 ? (

  return (
    <Container defaultPadding headerTitle="Add Location">
      <Typography>
        Once you add a location, the images and exact position you add will be
        available for others to see and explore.
      </Typography>
      <BigButton
        title="Add"
        onPress={() => navigation.navigate(ADD_LOCATION_SCREEN_MAIN)}
        isSmall
      />
    </Container>
  );
};

export default AddLocationInfoScreen;
