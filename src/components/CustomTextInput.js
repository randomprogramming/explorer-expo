import React, { useEffect, useRef } from "react";
import { TextInput, StyleSheet } from "react-native";
import pxGenerator from "../helpers/pxGenerator";
import useTheme from "../hooks/useTheme";
import { SEMI_BOLD_FF } from "./Typography";
import PropTypes from "prop-types";

const FONT_FAMILY = SEMI_BOLD_FF;

const CustomTextInput = ({
  value,
  onChange,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  marginTop,
}) => {
  let ref = useRef();

  const theme = useTheme();

  useEffect(() => {
    // when secureTextEntry is true, changing the font in the style directly does not work, this is a workaround
    if (ref && secureTextEntry) {
      ref.current.setNativeProps({
        style: { fontFamily: FONT_FAMILY },
      });
    }
    //eslint-disable-next-line
  }, [ref]);

  return (
    <TextInput
      ref={ref}
      style={[
        styles.main,
        marginTop && { marginTop: pxGenerator(marginTop) },
        {
          backgroundColor: theme.background.primary[0],
          borderColor: theme.accent.secondary,
          color: theme.text.primary,
        },
      ]}
      value={value}
      onChangeText={onChange && ((e) => onChange(e))}
      placeholder={placeholder}
      placeholderTextColor={theme.accent.secondary}
      selectionColor={theme.accent.primary}
      secureTextEntry={secureTextEntry}
      keyboardAppearance="dark"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
    />
  );
};

export default CustomTextInput;

CustomTextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  keyboardType: TextInput.propTypes.keyboardType,
  autoCapitalize: TextInput.propTypes.autoCapitalize,
  autoCorrect: PropTypes.bool,
  marginTop: PropTypes.number,
};

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderRadius: pxGenerator(2),
    paddingVertical: pxGenerator(3),
    paddingHorizontal: pxGenerator(4),
    fontSize: 17,
    fontFamily: FONT_FAMILY,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
