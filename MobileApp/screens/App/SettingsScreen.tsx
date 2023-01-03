import { View, Text, Pressable } from "react-native";
import React from "react";
import { AuthContext } from "../../context/AuthContext";

const SettingsScreen = () => {
  const state = React.useContext(AuthContext);
  return (
    <View>
      <Text>SettingsScreen</Text>
      <Pressable onPress={() => state.logout()}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
