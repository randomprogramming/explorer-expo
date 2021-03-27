import React from "react";
import { StyleSheet, View } from "react-native";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import CustomTextInput, { DEFAULT_SHADOW_STYLE } from "./CustomTextInput";
import Icon from "./Icon";
import PropTypes from "prop-types";

const SearchBar = ({ value, onChange, placeholder }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.main,
        {
          backgroundColor: theme.background.primary[1],
        },
      ]}
    >
      <Icon name="search" size={24} color={theme.accent.secondary} />
      <CustomTextInput
        disableShadow
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={[
          styles.textInput,
          { backgroundColor: theme.background.primary[1] },
        ]}
      />
    </View>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  main: {
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: pxGenerator(4),
    ...DEFAULT_SHADOW_STYLE,
  },
  textInput: {
    borderRadius: 100,
    borderColor: "transparent",
    flex: 1,
    paddingVertical: pxGenerator(2),
    paddingHorizontal: pxGenerator(3),
  },
});
