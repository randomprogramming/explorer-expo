import React, { useEffect } from "react";
import { Text } from "react-native";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import MainRouter from "./src/routers/MainRouter";
import Container from "./src/components/Container";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedInStatus } from "./src/reducers/personReducer";
import ScrollViewContainer from "./src/components/ScrollViewContainer";

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  const username = useSelector((state) => state.person.username);
  const token = useSelector((state) => state.person.token);
  const isLoggedIn = useSelector((state) => state.person.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    // If the username and token are set, change the logged in status to true
    // We could check if isLoggedIn is already true/false but it's fine
    if (username && username.length > 0 && token && token.length > 0) {
      dispatch(setLoggedInStatus(true));
    } else {
      dispatch(setLoggedInStatus(false));
    }
  }, [username, token]);

  return (
    <Container>
      {/* <ScrollViewContainer /> */}
      {
        fontsLoaded ? <MainRouter /> : <Text>Fonts not loaded!</Text> //TODO: replace this with a image screen or something
      }
    </Container>
  );
}
