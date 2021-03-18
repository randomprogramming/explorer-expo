import { StyleSheet } from "react-native";
import pxGenerator from "../../helpers/pxGenerator";

export default StyleSheet.create({
  main: {
    paddingHorizontal: pxGenerator(8),
    paddingVertical: pxGenerator(8),
  },
  flex: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
