import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const WelcomeScreen = () => {
  return (
    <SafeAreaView>
      <Text> Our Daily {"\n"} Recommendation</Text>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
