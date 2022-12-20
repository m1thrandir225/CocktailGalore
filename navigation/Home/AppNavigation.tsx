import { View, Text } from "react-native";
import React from "react";
import { AppStackParamList } from "../navigationTypes";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/Home/HomeScreen";
import ProfileScreen from "../../screens/MyProfile/ProfileScreen";
import SettingsScreen from "../../screens/Settings/SettingsScreen";

const AppStack = createStackNavigator<AppStackParamList>();
const AppNavigation = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
      <AppStack.Screen name="Settings" component={SettingsScreen} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
