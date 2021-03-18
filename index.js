import { registerRootComponent } from "expo";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

class WithWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.main}>
          <App />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

registerRootComponent(WithWrapper);
