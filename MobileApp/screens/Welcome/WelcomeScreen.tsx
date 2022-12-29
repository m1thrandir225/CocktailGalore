import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { WelcomeParamList } from "../../navigation/navigationTypes";

type NavigationProps = StackScreenProps<WelcomeParamList, "Welcome">;

const WelcomeScreen = ({ navigation, route }: NavigationProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("AuthStack", { screen: "Login" })}
      >
        <Text> Sign In </Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("AuthStack", { screen: "Signup" })}
      >
        <Text> Sign Up </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "orange",
  },
});
export default WelcomeScreen;
