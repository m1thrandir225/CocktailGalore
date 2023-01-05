import { View, Text, Pressable } from "react-native";
import React from "react";
import { AuthContext } from "../../context/AuthContext";

const SettingsScreen = () => {
  const state = React.useContext(AuthContext);
  return (
    <View>
      <Text>SettingsScreen</Text>
      <Pressable
        onPress={() => state?.logout()}
        style={{
          borderWidth: 2,
          borderColor: "black",
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default SettingsScreen;
