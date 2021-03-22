import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsBottomTabBarVisible,
  setIsCameraActive,
} from "../reducers/appStateReducer";
import Typography from "./Typography";
import useTheme from "../hooks/useTheme";
import pxGenerator from "../helpers/pxGenerator";
import PropTypes from "prop-types";

const CameraComponent = ({ onPictureTaken, onCancelPress }) => {
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
        let photo = await cameraRef.current.takePictureAsync();
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
  // TODO: Handle NO PERMISSIONS

  useEffect(() => {
    (async () => {
      const cameraPerm = await Permissions.getAsync(Permissions.CAMERA);
      setHasCameraPermission(cameraPerm.granted);
    })();
  }, []);

  useEffect(() => {
    dispatch(setIsBottomTabBarVisible(false));
    dispatch(setIsCameraActive(true));
    return () => {
      dispatch(setIsBottomTabBarVisible(true));
      dispatch(setIsCameraActive(false));
    };
  }, []);

  return (
    <View style={[styles.main, { backgroundColor: theme.common.black }]}>
      {/* TODO: Add flip and flash functionality */}
      <Camera
        style={styles.camera}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: pxGenerator(6),
            marginTop: pxGenerator(4),
          }}
        >
          <Typography color="secondary">Back Button</Typography>
          {onCancelPress && (
            <Pressable onPress={onCancelPress}>
              <Typography fontSize={20} color={theme.common.white}>
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
});
