import { useIsFocused } from "@react-navigation/core";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";
import Typography from "../../components/Typography";
import styles from "./styles";
import { useDispatch } from "react-redux";
import {
  resetSafeAreaViewEdges,
  setSafeAreaViewEdges,
} from "../../reducers/appStateReducer";

const MapScreen = () => {
  let isFocused = useIsFocused();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFocused) {
      dispatch(setSafeAreaViewEdges(["bottom"]));
    } else {
      dispatch(resetSafeAreaViewEdges());
    }
  }, [isFocused]);

  return <MapView style={styles.map} />;
};

export default MapScreen;
