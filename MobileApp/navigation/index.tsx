import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";
import RootNavigation from "./App/RootNavigation";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const state = useContext(AuthContext);
  console.log(state);
  return (
    <NavigationContainer>
      {state?.jwt == null && state?.user == null && state?.newUser == true ? (
        <WelcomeNavigation />
      ) : (
        <RootNavigation />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
