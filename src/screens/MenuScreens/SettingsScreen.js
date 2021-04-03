import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import ScrollViewContainer from "../../components/ScrollViewContainer";
import Typography from "../../components/Typography";
import pxGenerator from "../../helpers/pxGenerator";
import useTheme from "../../hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import { Switch } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkModeActive } from "../../reducers/appStateReducer";

const SwitchMenuItem = ({ name, value, onValueChange, icon: Icon }) => {
  const theme = useTheme();

  return (
    <View style={styles.menuItem}>
      {Icon}
      <View style={styles.nameContainer}>
        <Typography fontWeight="semi-bold">{name}</Typography>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        // Style only on android, depending if the value is true or not
        thumbColor={
          Platform.OS === "android" && value
            ? theme.accent.primary
            : theme.background.primary[1]
        }
      />
    </View>
  );
};

const MenuContainer = ({ children }) => {
  const theme = useTheme();

  return (
    <View>
      <View
        style={[
          styles.menuNameBackground,
          { backgroundColor: theme.background.primary[1] },
        ]}
      >
        <Typography style={styles.menuNameText} fontSize={14}>
          Appearance
        </Typography>
      </View>
      <View style={styles.menuContainer}>{children}</View>
    </View>
  );
};

const SettingsScreen = () => {
  const isDarkModeActive = useSelector(
    (state) => state.appState.isDarkModeActive
  );

  const dispatch = useDispatch();

  const theme = useTheme();

  return (
    <ScrollViewContainer headerTitle="Settings" headerDefaultPadding>
      <MenuContainer>
        <SwitchMenuItem
          icon={<Feather name="moon" size={24} color={theme.text.primary} />}
          name="Dark Mode"
          value={isDarkModeActive}
          onValueChange={(newValue) => dispatch(setIsDarkModeActive(newValue))}
        />
      </MenuContainer>
    </ScrollViewContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: pxGenerator(8),
  },
  menuNameBackground: {
    paddingHorizontal: pxGenerator(8),
    paddingVertical: pxGenerator(2),
  },
  menuNameText: { textTransform: "uppercase" },
  nameContainer: {
    flex: 1,
    marginLeft: pxGenerator(2),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: pxGenerator(3),
  },
});
