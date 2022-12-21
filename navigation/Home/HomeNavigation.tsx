import { View, Text } from "react-native";
import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";
import { HomeStackParamList } from "../navigationTypes";
import HomeScreen from "../../screens/Home/HomeScreen";
import SearchScreen from "../../screens/Search/SearchScreen";
import AllCocktailsScreen from "../../screens/AllCocktails/AllCocktailsScreen";

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Group>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen
          name="AllCocktails"
          component={AllCocktailsScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </HomeStack.Group>
      <HomeStack.Group>
        <HomeStack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
