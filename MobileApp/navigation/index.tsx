import { NavigationContainer } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AlmostWhite, RedLight } from "../constants/globalStyles";
import {
  selectAccessToken,
  selectCurrentUser,
  selectFirstTime,
  selectRefreshToken,
  setCredentials,
} from "../redux/slices/authSlice";
import RootNavigation from "./App/RootNavigation";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";

const Navigation = () => {
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const firstTime = useSelector(selectFirstTime);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  //fonts loading

  //initial data loading
  // React.useEffect(() => {
  //   const setInitialData = async () => {
  //     try {
  //       setLoading(true);
  //       const refreshToken = await SecureStore.getItemAsync("refreshToken");
  //       const firstTime = await SecureStore.getItemAsync("firstTime");
  //       if (refreshToken && firstTime) {
  //         const parsedFirstTime = JSON.parse(firstTime);
  //         // dispatch(setCredentials({}));
  //       }
  //     } catch (error: any) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   setInitialData();
  // }, []);
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
