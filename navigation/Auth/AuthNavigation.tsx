import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthParamList } from "../navigationTypes";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={View} />
      <AuthStack.Screen name="Signup" component={Text} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
