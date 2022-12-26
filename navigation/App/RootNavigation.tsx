import { View, Text, Pressable } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../navigationTypes";
import AppNavigation from "./DrawerNavigation";
import SearchScreen from "../../screens/App/SearchScreen";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import { DrawerActions } from "@react-navigation/native";
import FeatherIcons from "@expo/vector-icons/Feather";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
  });
  if (!fontsLoaded) return null;
  return (
    <RootStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        headerStyle: {
          height: 130,
          backgroundColor: AlmostWhite,
        },
      })}
      initialRouteName="Drawer"
    >
      <RootStack.Screen name="Drawer" component={AppNavigation} />
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: () => null,
            headerRight: () => null,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  marginLeft: 25,
                  padding: 13,
                  borderRadius: 50 / 2,
                  backgroundColor: RedLight,
                  shadowColor: "transparent",
                }}
              >
                <FeatherIcons name="x" size={24} color={AlmostWhite} />
              </Pressable>
            ),
          })}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigation;
