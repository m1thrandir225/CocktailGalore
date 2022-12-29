import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "../navigationTypes";
import LoginScreen from "../../screens/Auth/LoginScreen";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={Text} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
