import { View, Text } from "react-native";
import React, { SetStateAction } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigationTypes";
import LoginScreen from "../../screens/Auth/LoginScreen";
import SignUpScreen from "../../screens/Auth/SignUpScreen";
import WelcomeNavigation from "../Welcome/WelcomeNavigation";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
