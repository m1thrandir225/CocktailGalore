import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AppParamList } from "../navigationTypes";
import HomeScreen from "../../screens/App/HomeScreen";
import SearchScreen from "../../screens/App/SearchScreen";
import SettingsScreen from "../../screens/App/SettingsScreen";
import InsightsScreen from "../../screens/App/InsightsScreen";
import CocktailsScreen from "../../screens/App/CocktailsScreen";
import MyProfileScreen from "../../screens/App/MyProfileScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";

const AppDrawer = createDrawerNavigator<AppParamList>();
const AppNavigation = () => {
  return (
    <AppDrawer.Navigator
      initialRouteName="Home"
      //   screenOptions={{ headerShown: false }}
    >
      <AppDrawer.Screen name="Home" component={HomeScreen} />
      <AppDrawer.Screen name="MyProfile" component={MyProfileScreen} />
      <AppDrawer.Screen name="Cocktails" component={CocktailsScreen} />
      <AppDrawer.Screen name="Insights" component={InsightsScreen} />
      <AppDrawer.Screen name="Settings" component={SettingsScreen} />
      <AppDrawer.Screen name="Search" component={SearchScreen} />
    </AppDrawer.Navigator>
  );
};

export default AppNavigation;
