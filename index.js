import { registerRootComponent } from "expo";
import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import useTheme from "./src/hooks/useTheme";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

function MainWrapper() {
  // We want to use redux state from some of the other wrappers, so we have to split them up
  return (
    <Provider store={store}>
      <WithWrapper />
    </Provider>
  );
}

function WithWrapper() {
  const theme = useTheme();

  const isCameraActive = useSelector((state) => state.appState.isCameraActive);
  const safeAreaViewEdges = useSelector(
    (state) => state.appState.safeAreaViewEdges
  );

  return (
    <NavigationContainer>
      {/* TODO: Hide status bar when the map screen is open */}
      <StatusBar
        barStyle={isCameraActive ? "light-content" : theme.statusBarStyle}
        backgroundColor={
          isCameraActive ? theme.common.black : theme.background.primary[0]
        }
      />
      <SafeAreaView
        edges={safeAreaViewEdges}
        style={[
          styles.main,
          isCameraActive
            ? { backgroundColor: theme.common.black }
            : { backgroundColor: theme.background.primary[0] },
        ]}
      >
        <App />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

registerRootComponent(MainWrapper);
