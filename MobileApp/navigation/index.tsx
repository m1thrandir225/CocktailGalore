import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AlmostWhite, RedLight } from "../constants/globalStyles";
import {
  selectAccessToken,
  selectRefreshToken,
  setCredentials,
} from "../redux/slices/authSlice";
import { selectUser } from "../redux/slices/userSlice";
import RootNavigation from "./App/RootNavigation";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";

const Navigation = () => {
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [firstTime, setFirstTime] = React.useState(true);
  React.useEffect(() => {
    const getTokens = async () => {
      try {
        setLoading(true);
        const accessToken = await SecureStore.getItemAsync("accessToken");
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (accessToken != null && refreshToken != null) {
          dispatch(
            setCredentials({
              accessToken: accessToken,
              refreshToken: refreshToken,
            }),
          );
        }
      } catch (error: any) {
        console.warn(error);
      } finally {
        setLoading(false);
      }
    };
    getTokens();
  }, []);

  React.useEffect(() => {
    if (accessToken != null && refreshToken != null) {
      if (user != null && user.likedFlavours.length > 0) {
        setFirstTime(false);
      }
    } else {
      setFirstTime(true);
    }
  }, [accessToken, refreshToken, user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={RedLight} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {firstTime ? <WelcomeNavigation /> : <RootNavigation />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AlmostWhite,
  },
});
export default Navigation;
