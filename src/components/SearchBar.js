import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// TODO: Implement prop types
const SearchBar = ({ value, onChange }) => {
  return <TextInput placeholder="test" value={value} onChangeText={onChange} />;
};

export default SearchBar;

const styles = StyleSheet.create({});
