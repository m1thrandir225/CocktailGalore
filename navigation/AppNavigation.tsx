import { View, Text } from "react-native";
import React from "react";
import { AppStackParamList } from "./navigationTypes";
import { TransitionPresets } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/MyProfile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import { Home, Settings, User } from "react-native-feather";
import { Cream, Mauave, Tar } from "../constants/globalStyles";
import HomeNavigation from "./Home/HomeNavigation";
import ProfileNavigation from "./Profile/ProfileNavigation";
import SettingsNavigation from "./Settings/SettingsNavigation";

const AppStack = createBottomTabNavigator<AppStackParamList>();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName="HomeStack"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Mauave,
        tabBarInactiveTintColor: Cream,
        tabBarActiveBackgroundColor: Tar,
        tabBarInactiveBackgroundColor: Tar,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "HomeStack") {
            return <Home color={color} width={size} height={size} />;
          } else if (route.name === "ProfileStack") {
            return <User color={color} width={size} height={size} />;
          } else if (route.name === "SettingsStack") {
            return <Settings color={color} width={size} height={size} />;
          }
        },
      })}
    >
      <AppStack.Screen name="HomeStack" component={HomeNavigation} />
      <AppStack.Screen name="ProfileStack" component={ProfileNavigation} />
      <AppStack.Screen name="SettingsStack" component={SettingsNavigation} />
    </AppStack.Navigator>
  );
};

export default AppNavigation;
