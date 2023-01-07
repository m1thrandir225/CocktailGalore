import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";
import RootNavigation from "./App/RootNavigation";
import { RedLight } from "../constants/globalStyles";
import {
  selectCurrentUser,
  selectAccessToken,
  selectRefreshToken,
} from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
const Navigation = () => {
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  console.log(user, accessToken, refreshToken);
  return (
    <NavigationContainer>
      {user == null && accessToken == null && refreshToken == null ? (
        <WelcomeNavigation />
      ) : (
        <RootNavigation />
      )}
    </NavigationContainer>
  );
};
export default Navigation;
