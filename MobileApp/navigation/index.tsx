import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";
import RootNavigation from "./App/RootNavigation";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const state = useContext(AuthContext);
  console.log(state?.user);
  console.log(state?.accessToken);
  console.log(state?.newUser);
  return (
    <NavigationContainer>
      {state?.user == null &&
      state?.accessToken == null &&
      state?.newUser == true ? (
        <WelcomeNavigation />
      ) : (
        <RootNavigation />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
