import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../navigation/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { AlmostWhite } from "../../constants/globalStyles";
import { AuthContext } from "../../context/AuthContext";

type NavigationProps = StackScreenProps<AuthParamList, "Login">;

const LoginScreen = ({ navigation, route }: NavigationProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const state = React.useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        onChange={(value) => setEmail(value.nativeEvent.text)}
        placeholder={"Enter your email"}
      ></TextInput>
      <TextInput
        onChange={(value) => setPassword(value.nativeEvent.text)}
        placeholder={"Enter your password"}
      ></TextInput>
      <Pressable onPress={() => state?.login(email, password)}>
        <Text> Login </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  inputField: {},
});
export default LoginScreen;
