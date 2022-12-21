import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingsStackParamList } from "../navigationTypes";
import SettingsScreen from "../../screens/Settings/SettingsScreen";

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigation = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigation;
