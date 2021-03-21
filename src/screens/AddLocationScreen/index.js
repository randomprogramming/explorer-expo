import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import * as Permissions from "expo-permissions";
import Typography from "../../components/Typography";
// import styles from "./styles";
import { Camera } from "expo-camera";
import { useSelector } from "react-redux";

let camera;
const AddLocationScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const media = useSelector((state) => state.addLocation.media);

  useEffect(() => {
    (async () => {
      const perm = await Permissions.getAsync(Permissions.CAMERA);
      setHasCameraPermission(perm.granted);
      setCanAskAgain(perm.canAskAgain);
      console.log(perm);
    })();
  }, []);

  async function takePicture() {
    try {
      if (camera && isCameraReady) {
        let photo = await camera.takePictureAsync({ skipProcessing: false });
        console.log(photo);
      } else {
        console.log("NOPE!");
      }
    } catch (err) {
      console.log("Error when taking picture:", err);
    }
  }

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

  if (!hasCameraPermission && !canAskAgain) {
    askForCameraPermission();
    return (
      <View>
        <Typography>
          Please allow the app to access the camera in your settings.
        </Typography>
      </View>
    );
  }
  // media.length === 0 ? (
  {
    /* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Typography style={styles.text}> Flip </Typography>
          </TouchableOpacity> */
  }
  {
    /* <TouchableOpacity
            onPress={takePicture}
            style={{
              width: 30,
              height: 30,
              backgroundColor: "red",
              borderRadius: 20,
            }}
          ></TouchableOpacity> */
  }
  return (
    <View style={{ flex: 1, backgroundColor: "lightblue" }}>
      <Camera
        ref={(r) => {
          camera = r;
        }}
        style={styles.camera}
        type={type}
        useCamera2Api
        onCameraReady={() => setIsCameraReady(true)}
        onMountError={(err) => console.log("error", err)}
      >
        <View style={styles.buttonContainer}>
          <View style={{ alignSelf: "flex-end" }}>
            <Button title="Take Pic" onPress={takePicture} />
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 99,
    width: 300,
    height: 600,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default AddLocationScreen;
