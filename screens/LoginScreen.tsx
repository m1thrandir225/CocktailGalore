import { View, Text, StyleSheet, SafeAreaView, TextInput } from "react-native";
import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "../styles/globalStyles";
import {
  Raleway_700Bold,
  Raleway_400Regular,
} from "@expo-google-fonts/raleway";

import { useFonts } from "expo-font";
import InputField from "../components/InputField";
const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <InputField
        value={username}
        onChange={setUsername}
        placeholder="Enter your username"
        label="Username"
      />
      <InputField
        value={password}
        onChange={setPassword}
        label="Password"
        placeholder="Enter your password"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.cornsilk,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "Raleway_700Bold",
    color: Colors.dark_olive,
  },
});

export default LoginScreen;
