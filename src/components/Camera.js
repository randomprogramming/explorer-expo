import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
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
const TAKE_PICTURE_BUTTON_SIZE = 60;
const BOTTOM_BAR_ICON_SIZE = 28;

const CameraComponent = ({
  onPictureTaken,
  onCancelPress,
  onBackButtonPress,
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [useBackCamera, setUseBackCamera] = useState(true);
  const [useFlash, setUseFlash] = useState(false);

  const cameraRef = useRef();

  const dispatch = useDispatch();

  const theme = useTheme();

  async function handleTakePicturePress() {
    console.log("Trying to take picture...");
    try {
      if (cameraRef.current && isCameraReady) {
        // TODO: Implement compressing and post processing
        // TODO: change the quality, 0.01 is just for testing so that uploading doesnt take a long time
        let photo = await cameraRef.current.takePictureAsync({ quality: 0.01 });
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
        type={
          useBackCamera
            ? Camera.Constants.Type.back
            : Camera.Constants.Type.front
        }
        flashMode={
          useFlash
            ? Camera.Constants.FlashMode.on
            : Camera.Constants.FlashMode.off
        }
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
        <View
          style={[
            styles.bottomBarItemContainer,
            { width: Dimensions.get("window").width / 3 },
          ]}
        >
          <TouchableOpacity onPress={() => setUseFlash(!useFlash)}>
            <Icon
              name="flash"
              size={BOTTOM_BAR_ICON_SIZE}
              color={useFlash ? theme.accent.primary : theme.common.white}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.bottomBarItemContainer,
            { width: Dimensions.get("window").width / 3 },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.takePictureButtonOuter,
              { borderColor: theme.accent.primary },
            ]}
            onPress={handleTakePicturePress}
          >
            <View
              style={[
                styles.takePictureButtonInner,
                { backgroundColor: theme.accent.primary },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.bottomBarItemContainer,
            { width: Dimensions.get("window").width / 3 },
          ]}
        >
          <TouchableOpacity onPress={() => setUseBackCamera(!useBackCamera)}>
            <Icon
              name="reverse-camera"
              size={BOTTOM_BAR_ICON_SIZE}
              color="white"
            />
          </TouchableOpacity>
        </View>
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
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomBarItemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  takePictureButtonOuter: {
    padding: pxGenerator(1),
    borderWidth: 2,
    borderRadius: TAKE_PICTURE_BUTTON_SIZE,
  },
  takePictureButtonInner: {
    height: TAKE_PICTURE_BUTTON_SIZE,
    width: TAKE_PICTURE_BUTTON_SIZE,
    borderRadius: TAKE_PICTURE_BUTTON_SIZE,
  },
  topButtonsContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: pxGenerator(8),
    marginTop: pxGenerator(6),
  },
});
