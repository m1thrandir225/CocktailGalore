import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeParamList } from "../navigationTypes";
import AuthNavigation from "../Auth/AuthNavigation";
import WelcomeScreen from "../../screens/Welcome/WelcomeScreen";
import OverviewScreen from "../../screens/Welcome/OverviewScreen";
import InitialCustomizationScreen from "../../screens/Welcome/InitialCustomizationScreen";

const WelcomeStack = createStackNavigator<WelcomeParamList>();

const WelcomeNavigation = () => {
  return (
    <WelcomeStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <WelcomeStack.Screen name="Welcome" component={WelcomeScreen} />
      <WelcomeStack.Screen name="Overview" component={OverviewScreen} />
      <WelcomeStack.Screen
        name="InitialCustomization"
        component={InitialCustomizationScreen}
      />
      <WelcomeStack.Screen name="AuthStack" component={AuthNavigation} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeNavigation;
