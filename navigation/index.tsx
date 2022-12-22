import { View, Text } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./App/AppNavigation";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";

const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {loggedIn == true ? <AppNavigation /> : <AppNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
