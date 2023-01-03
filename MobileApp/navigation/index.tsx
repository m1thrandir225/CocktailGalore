import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeNavigation from "./Welcome/WelcomeNavigation";
import RootNavigation from "./App/RootNavigation";
import { AuthContext } from "../context/AuthContext";
import { RedLight } from "../constants/globalStyles";

const Navigation = () => {
  const state = useContext(AuthContext);
  // if (state.loading) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         backgroundColor: "rgba(0, 0, 0, 0.1)",
  //       }}
  //     >
  //       <ActivityIndicator size="large" color={RedLight} />
  //     </View>
  //   );
  // }
  return (
    <NavigationContainer>
      {state?.user == null ||
      state?.accessToken == null ||
      state?.newUser == true ? (
        <WelcomeNavigation />
      ) : (
        <RootNavigation />
      )}
    </NavigationContainer>
  );
};
export default Navigation;
