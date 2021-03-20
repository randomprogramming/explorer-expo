import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import * as Permissions from "expo-permissions";
import Typography from "../../components/Typography";
// import styles from "./styles";
import { Camera } from "expo-camera";

const AddLocationScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    // (async () => {
    //   const { status } = await Camera.requestPermissionsAsync();
    //   setHasPermission(status === "granted");
    // })();
    (async () => {
      const perm = await Permissions.getAsync(Permissions.CAMERA);
      console.log(perm);
    })();
  }, []);

  return (
    // <View style={{ flex: 1, backgroundColor: "lightblue" }}>
    //   <Camera style={styles.camera} type={type}>
    //     <View style={styles.buttonContainer}>
    //       <TouchableOpacity
    //         style={styles.button}
    //         onPress={() => {
    //           setType(
    //             type === Camera.Constants.Type.back
    //               ? Camera.Constants.Type.front
    //               : Camera.Constants.Type.back
    //           );
    //         }}
    //       >
    //         <Typography style={styles.text}> Flip </Typography>
    //       </TouchableOpacity>
    //     </View>
    //   </Camera>
    // </View>
    <View></View>
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
    width: 100,
    height: 100,
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
