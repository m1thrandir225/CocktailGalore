import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";
import RootNavigation from "./App/RootNavigation";
import { RedLight } from "../constants/globalStyles";

const Navigation = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <NavigationContainer>
      {isAuthenticated ? <WelcomeNavigation /> : <RootNavigation />}
    </NavigationContainer>
  );
};
export default Navigation;
