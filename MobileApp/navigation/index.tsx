import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";
import RootNavigation from "./App/RootNavigation";
import { AlmostWhite, RedLight } from "../constants/globalStyles";
import {
  selectCurrentUser,
  selectAccessToken,
  selectRefreshToken,
  setCredentials,
  selectFirstTime,
} from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
const Navigation = () => {
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const firstTime = useSelector(selectFirstTime);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const setInitialData = async () => {
      setLoading(true);
      try {
        const user = await SecureStore.getItemAsync("user");
        const accessToken = await SecureStore.getItemAsync("accessToken");
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        const firstTime = await SecureStore.getItemAsync("firstTime");
        if (user && accessToken && refreshToken && firstTime) {
          const parsedUser = JSON.parse(user);
          const parsedFirstTime = JSON.parse(firstTime);
          dispatch(
            setCredentials({
              user: parsedUser,
              accessToken: accessToken,
              refreshToken: refreshToken,
              firstTime: parsedFirstTime,
            }),
          );
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    setInitialData();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={RedLight} />
      </View>
    );
  }
  console.log(user, accessToken, refreshToken, firstTime);
  return (
    <NavigationContainer>
      {user != null &&
      accessToken != null &&
      refreshToken != null &&
      firstTime == false ? (
        <RootNavigation />
      ) : (
        <WelcomeNavigation />
      )}
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
