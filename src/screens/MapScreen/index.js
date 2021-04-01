import { useIsFocused } from "@react-navigation/core";
import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import styles from "./styles";
import { useDispatch } from "react-redux";
import {
  resetSafeAreaViewEdges,
  setSafeAreaViewEdges,
} from "../../reducers/appStateReducer";
import LocationMarker from "./LocationMarker";
import { useSelector } from "react-redux";
import { getLocationsForRegion } from "../../actions/mapActions";
import BottomSheetLocation from "./BottomSheetLocation";
import { setSelectedLocation } from "../../reducers/mapReducer";

const SNAP_POINTS = ["7%", "40%", "70%"];

const MapScreen = () => {
  const sheetRef = useRef(null);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  let isFocused = useIsFocused();

  const locations = useSelector((state) => state.map.locations);
  const selectedLocation = useSelector((state) => state.map.selectedLocation);

  const dispatch = useDispatch();

  function handleRegionChange(region) {
    dispatch(getLocationsForRegion(region));
  }

  function onLocationPress(locationId) {
    dispatch(setSelectedLocation(locationId));
  }

  useEffect(() => {
    // When the map is open, we want to remove the safe area view from the top of the screen
    if (isFocused) {
      dispatch(setSafeAreaViewEdges(["bottom"]));
    } else {
      dispatch(resetSafeAreaViewEdges());
    }
  }, [isFocused]);

  useEffect(() => {
    // TODO: If the previous selectedLocation had keys, don't snap to last position, instead use -2 or something
    const selectedLocationHasKeys = Object.keys(selectedLocation).length > 0;
    setIsLocationSelected(selectedLocationHasKeys);

    // Every time selected location changes, and it has some properties,
    // meaning it's not empty, we want to expand the bottom sheet
    if (selectedLocationHasKeys) {
      if (sheetRef.current) {
        sheetRef.current.snapTo(SNAP_POINTS.length - 1);
      }
    }
  }, [selectedLocation]);

  return (
    <>
      <MapView
        style={styles.map}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation
      >
        {locations &&
          locations.map((location) => (
            <LocationMarker
              key={location.id}
              location={location}
              onPress={onLocationPress}
            />
          ))}
      </MapView>
      <BottomSheetLocation
        sheetRef={sheetRef}
        snapPoints={SNAP_POINTS}
        isLocationSelected={isLocationSelected}
      />
    </>
  );
};

export default MapScreen;
