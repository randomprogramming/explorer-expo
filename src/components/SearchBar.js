import React from "react";
import { StyleSheet, View } from "react-native";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import { DEFAULT_SHADOW_STYLE } from "./CustomTextInput";
import Icon from "./Icon";
import PropTypes from "prop-types";
import DelayedInput from "react-native-debounce-input";
import { SEMI_BOLD_FF } from "./Typography";

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
      <Icon name="search" size={22} color={theme.accent.secondary} />
      <DelayedInput
        placeholder={placeholder}
        placeholderTextColor={theme.accent.secondary}
        value={value}
        onChangeText={onChange}
        delayTimeout={600}
        minLength={0}
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
    flex: 1,
    paddingVertical: pxGenerator(2),
    paddingHorizontal: pxGenerator(3),
    fontFamily: SEMI_BOLD_FF,
    fontSize: 16,
  },
});
