import { View, Text } from "react-native";
import React from "react";
import { AppParamList } from "../../navigation/navigationTypes";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
type NavigationProps = DrawerScreenProps<AppParamList, "MyProfile">;
const MyProfileScreen = ({ navigation, route }: NavigationProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>MyProfileScreen</Text>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
