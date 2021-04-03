import React from "react";
import { View, TouchableOpacity } from "react-native";
import BigButton from "../../components/BigButton";
import Container from "../../components/Container";
import Link from "../../components/Link";
import Typography from "../../components/Typography";
import useTheme from "../../hooks/useTheme";
import {
  PROFILE_SCREEN_LOGIN_SCREEN,
  PROFILE_SCREEN_REGISTER_SCREEN,
  PROFILE_SCREEN_SETTINGS_SCREEN,
} from "../../routers/ProfileRouter/names";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const MenuItem = ({ name, icon: Icon, isFirst, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.menuItem,
        { borderBottomColor: theme.accent.secondary },
        // Add a top border to the first item in the menu
        isFirst && {
          borderTopColor: theme.accent.secondary,
          borderTopWidth: 1,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Typography>{name}</Typography>
      </View>
      <View>{Icon}</View>
    </TouchableOpacity>
  );
};

const NoAuthProfileScreen = ({ navigation }) => {
  const theme = useTheme();

  const ICON_SIZE = 30;
  const ICON_COLOR = theme.text.primary;

  return (
    <Container defaultPadding headerTitle="Your Profile">
      <Typography>
        You can see your own profile here, although you will need to log in
        first.
      </Typography>
      <BigButton
        isSmall
        title="Sign in"
        onPress={() => navigation.navigate(PROFILE_SCREEN_LOGIN_SCREEN)}
      />
      <View style={styles.linkContainer}>
        <Typography>You can also </Typography>
        <Link
          onPress={() => navigation.navigate(PROFILE_SCREEN_REGISTER_SCREEN)}
        >
          sign up
        </Link>
      </View>
      <View style={styles.menu}>
        <MenuItem
          onPress={() => navigation.navigate(PROFILE_SCREEN_SETTINGS_SCREEN)}
          isFirst
          name="Settings"
          icon={
            <Ionicons
              name="ios-settings-outline"
              size={ICON_SIZE}
              color={ICON_COLOR}
            />
          }
        />
      </View>
    </Container>
  );
};

export default NoAuthProfileScreen;
