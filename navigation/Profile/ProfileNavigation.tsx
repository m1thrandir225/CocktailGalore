import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigationTypes";
import ProfileScreen from "../../screens/MyProfile/ProfileScreen";

const ProfileStack = createStackNavigator<ProfileStackParamList>();
const ProfileNavigation = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
