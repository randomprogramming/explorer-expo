import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  StatusBar,
  SafeAreaView,
} from "react-native";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsBottomTabBarVisible,
  setIsCameraActive,
} from "../reducers/appStateReducer";
import Typography from "./Typography";
import useTheme from "../hooks/useTheme";

const CameraComponent = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const camera = useRef();

  const dispatch = useDispatch();

  const theme = useTheme();

  // useEffect(() => {
  //   (async () => {
  //     const cameraPerm = await Permissions.getAsync(Permissions.CAMERA);
  //     setHasCameraPermission(cameraPerm.granted);
  //   })();
  // }, []);

  useEffect(() => {
    dispatch(setIsBottomTabBarVisible(false));
    dispatch(setIsCameraActive(true));
    return () => {
      dispatch(setIsBottomTabBarVisible(true));
      dispatch(setIsCameraActive(false));
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "lightblue" }}>
      <Camera style={{ flex: 1 }}>
        <Typography>We here</Typography>
      </Camera>
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({});
