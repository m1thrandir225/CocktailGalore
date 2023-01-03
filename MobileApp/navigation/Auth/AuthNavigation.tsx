import { View, Text } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { AuthParamList } from "../navigationTypes";
import LoginScreen from "../../screens/Auth/LoginScreen";
import SignupScreen from "../../screens/Auth/SignupScreen";
import OverviewScreen from "../../screens/Welcome/OverviewScreen";
import InitialCustomizationScreen from "../../screens/Welcome/InitialCustomizationScreen";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        ...CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
      <AuthStack.Screen name="Overview" component={OverviewScreen} />
      <AuthStack.Screen
        name="InitialCustomization"
        component={InitialCustomizationScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
