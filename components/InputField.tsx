import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { Colors } from "../styles/globalStyles";
import {
  Raleway_700Bold,
  Raleway_400Regular,
} from "@expo-google-fonts/raleway";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

type inputFieldProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  label: string;
};

const InputField: React.FC<inputFieldProps> = ({
  value,
  onChange,
  placeholder,
  label,
}) => {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular,
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 15,
    marginTop: 15,
  },
  label: {
    fontFamily: "Raleway_400Regular",
    fontSize: 16,
    color: Colors.dark_olive,
    marginBottom: 6,
  },
  input: {
    fontFamily: "Raleway_400Regular",
    fontSize: 14,
    color: Colors.dark_olive,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.kombu_green,
  },
});

export default InputField;
