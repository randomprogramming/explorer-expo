import { registerRootComponent } from "expo";
import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import useTheme from "./src/hooks/useTheme";
import store from "./store";
import { NavigationContainer } from "@react-navigation/native";

function WithWrapper() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar
          translucent
          barStyle={theme.statusBarStyle}
          backgroundColor={theme.background.primary[0]}
        />
        <SafeAreaView
          style={[
            styles.main,
            { backgroundColor: theme.background.primary[0] },
          ]}
        >
          <App />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

registerRootComponent(WithWrapper);
