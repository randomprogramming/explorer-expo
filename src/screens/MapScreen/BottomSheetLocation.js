import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../../components/Typography";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import PropTypes from "prop-types";
import pxGenerator from "../../helpers/pxGenerator";

const CustomBackground = ({ style }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        style,
        styles.customBackground,
        {
          backgroundColor: theme.background.primary[1],
        },
      ]}
    />
  );
};

const CustomHandle = ({ isLocationSelected }) => {
  const theme = useTheme();

  return (
    <View style={styles.handleContainer}>
      <View
        style={[
          styles.customHandle,
          {
            backgroundColor: isLocationSelected
              ? theme.background.secondary[0]
              : theme.accent.secondary,
          },
        ]}
      />
    </View>
  );
};

const BottomSheetLocation = ({ sheetRef, snapPoints, isLocationSelected }) => {
  const selectedLocation = useSelector((state) => state.map.selectedLocation);
  const locations = useSelector((state) => state.map.locations);

  const renderWhenLocationNotSelected = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>{locations.length} available locations</Typography>
    </View>
  );

  const renderWhenLocationSelected = () => (
    <View>
      <Typography>{selectedLocation.title}</Typography>
    </View>
  );

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      index={0}
      backgroundComponent={CustomBackground}
      style={styles.sheet}
      enableHandlePanningGesture={isLocationSelected}
      enableContentPanningGesture={isLocationSelected}
      handleComponent={({ props }) => (
        <CustomHandle {...props} isLocationSelected={isLocationSelected} />
      )}
    >
      {isLocationSelected
        ? renderWhenLocationSelected()
        : renderWhenLocationNotSelected()}
    </BottomSheet>
  );
};

export default BottomSheetLocation;

BottomSheetLocation.propTypes = {
  snapPoints: PropTypes.array,
  isLocationSelected: PropTypes.bool,
};

const styles = StyleSheet.create({
  sheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  customBackground: {
    borderRadius: pxGenerator(8),
  },
  handleContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: pxGenerator(4),
  },
  customHandle: {
    width: 30,
    height: 5,
    borderRadius: 100,
  },
});
