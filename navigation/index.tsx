import { View, Text } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";
import RootNavigation from "./App/RootNavigation";

const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  return (
    <NavigationContainer>
      {loggedIn == true ? <WelcomeNavigation /> : <RootNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
