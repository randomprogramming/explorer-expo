import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import styles from "./styles";
import { useDispatch } from "react-redux";
import {
  resetSafeAreaViewEdges,
  setSafeAreaViewEdges,
} from "../../reducers/appStateReducer";
import axios from "axios";
import { SEARCH_REGION_FOR_LOCATIONS_URL } from "../../../apiLinks";
import LocationMarker from "./LocationMarker";
import { useSelector } from "react-redux";
import { getLocationsForRegion } from "../../actions/mapActions";

const MapScreen = () => {
  let isFocused = useIsFocused();

  const locations = useSelector((state) => state.map.locations);

  const dispatch = useDispatch();

  function handleRegionChange(region) {
    dispatch(getLocationsForRegion(region));
  }

  useEffect(() => {
    // When the map is open, we want to remove the safe area view from the top of the screen
    if (isFocused) {
      dispatch(setSafeAreaViewEdges(["bottom"]));
    } else {
      dispatch(resetSafeAreaViewEdges());
    }
  }, [isFocused]);

  return (
    <MapView style={styles.map} onRegionChangeComplete={handleRegionChange}>
      {locations &&
        locations.map((location) => (
          <LocationMarker key={location.id} location={location} />
        ))}
    </MapView>
  );
};

export default MapScreen;
