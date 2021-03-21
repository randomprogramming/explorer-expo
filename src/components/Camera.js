import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Button } from "react-native";
import * as Permissions from "expo-permissions";
import Typography from "../../components/Typography";
import { Camera } from "expo-camera";
import { useSelector, useDispatch } from "react-redux";

const Camera = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const camera = useRef(initialValue);

  useEffect(() => {
    (async () => {
      const cameraPerm = await Permissions.getAsync(Permissions.CAMERA);
      setHasCameraPermission(cameraPerm.granted);
    })();
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({});
