import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { useDispatch } from "react-redux";
import {
  setIsBottomTabBarVisible,
  setIsCameraActive,
} from "../reducers/appStateReducer";
import Typography from "./Typography";
import useTheme from "../hooks/useTheme";
import pxGenerator from "../helpers/pxGenerator";
import PropTypes from "prop-types";
import Icon from "./Icon";

const CANCEL_TEXT_SIZE = 20;

const CameraComponent = ({
  onPictureTaken,
  onCancelPress,
  onBackButtonPress,
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const cameraRef = useRef();

  const dispatch = useDispatch();

  const theme = useTheme();

  async function handleTakePicturePress() {
    console.log("Trying to take picture...");
    try {
      if (cameraRef.current && isCameraReady) {
        // TODO: Implement compressing and post processing
        let photo = await cameraRef.current.takePictureAsync({ quality: 1 });
        console.log("Photo taken.");
        if (onPictureTaken) {
          onPictureTaken(photo);
        }
      } else {
        console.log("Can't take picture.");
      }
    } catch (err) {
      console.log("Error when taking picture: ", err);
    }
  }
  async function askForCameraPermission() {
    const { status } = await Camera.requestPermissionsAsync();
    setHasCameraPermission(status === "granted");
  }

  useEffect(() => {
    (async () => {
      const cameraPerm = await Permissions.getAsync(Permissions.CAMERA);
      setHasCameraPermission(cameraPerm.granted);
    })();
  }, []);

  useEffect(() => {
    if (hasCameraPermission) {
      dispatch(setIsBottomTabBarVisible(false));
      dispatch(setIsCameraActive(true));
      return () => {
        dispatch(setIsBottomTabBarVisible(true));
        dispatch(setIsCameraActive(false));
      };
    }
  }, [hasCameraPermission]);

  if (!hasCameraPermission) {
    askForCameraPermission();

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background.primary[0],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Please allow the app to use the camera.</Typography>
      </View>
    );
  }

  return (
    <View style={[styles.main, { backgroundColor: theme.common.black }]}>
      {/* TODO: Add flip and flash functionality */}
      <Camera
        style={styles.camera}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View style={styles.topButtonsContainer}>
          <View>
            {onBackButtonPress && (
              <Pressable onPress={onBackButtonPress} hitSlop={16}>
                <Icon
                  name="back"
                  size={CANCEL_TEXT_SIZE + 4}
                  color={theme.common.white}
                />
              </Pressable>
            )}
          </View>
          {onCancelPress && (
            <Pressable onPress={onCancelPress} hitSlop={16}>
              <Typography
                fontSize={CANCEL_TEXT_SIZE}
                color={theme.common.white}
              >
                Cancel
              </Typography>
            </Pressable>
          )}
        </View>
        <View style={{ flex: 1 }}>
          {/* Just a placeholder to create space for the actual camera */}
        </View>
      </Camera>
      <View style={styles.bottomBarContainer}>
        <TouchableOpacity
          style={[
            styles.takePictureButton,
            { backgroundColor: theme.accent.primary },
          ]}
          onPress={handleTakePicturePress}
        ></TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraComponent;

CameraComponent.propTypes = {
  onPictureTaken: PropTypes.func,
  onCancelPress: PropTypes.func,
  onBackButtonPress: PropTypes.func,
};

const styles = StyleSheet.create({
  main: { flex: 1 },
  camera: {
    flex: 1,
    flexDirection: "column",
    borderRadius: pxGenerator(6),
    overflow: "hidden",
  },
  bottomBarContainer: {
    paddingVertical: pxGenerator(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  takePictureButton: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  topButtonsContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: pxGenerator(8),
    marginTop: pxGenerator(6),
  },
});
