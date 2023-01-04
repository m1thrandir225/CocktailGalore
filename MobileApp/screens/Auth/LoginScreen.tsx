import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthParamList } from "../../navigation/navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AlmostDark,
  AlmostWhite,
  RedLight,
} from "../../constants/globalStyles";
import { AuthContext } from "../../context/AuthContext";
import { useFonts } from "expo-font";
import {
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import InputBox from "../../components/Reusable/InputBox";

type NavigationProps = StackScreenProps<AuthParamList, "Login">;

const LoginScreen = ({ navigation, route }: NavigationProps) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const state = React.useContext(AuthContext);
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_400Regular,
  });
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logo-dark.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Login</Text>
        <InputBox
          text="Enter your email"
          iconName="mail"
          onChange={setEmail}
          iconColor={AlmostDark}
        />
        <InputBox
          text="Enter your password"
          iconName="lock"
          onChange={setPassword}
          iconColor={AlmostDark}
          isPassword
        />
        <Pressable
          style={styles.continueButton}
          onPress={() => state?.login(email, password)}
        >
          <Text style={styles.continueButtonText}> Continue </Text>
        </Pressable>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}> Or </Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialsContainer}>
          <Pressable>
            <AntDesign name="google" size={40} color={AlmostDark} />
          </Pressable>
          <Pressable>
            <AntDesign name="twitter" size={40} color={AlmostDark} />
          </Pressable>
          <Pressable>
            <AntDesign name="facebook-square" size={40} color={AlmostDark} />
          </Pressable>
        </View>
        <Pressable
          style={styles.outlineButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.outlineButtonText}> Don't have an account ?</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AlmostWhite,
  },
  logo: {
    marginTop: 45,
    marginBottom: 50,
    width: 145,
    height: 90,
  },
  title: {
    fontSize: 28,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostDark,
    marginBottom: 50 - 25 / 2,
  },
  continueButton: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: RedLight,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25 / 2,
  },
  continueButtonText: {
    fontSize: 24,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostWhite,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 50 - 25 / 2,
    marginBottom: 25,
  },
  line: {
    width: 121,
    height: 2,
    backgroundColor: AlmostDark,
    borderRadius: 50 / 2,
  },
  orText: {
    fontSize: 21,
    fontFamily: "Montserrat_600SemiBold",
    color: AlmostDark,
  },
  socialsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 25,
    marginBottom: 25,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: AlmostDark,
    width: "80%",
    marginTop: 25 / 2,
    marginBottom: 80,
  },
  outlineButtonText: {
    paddingVertical: 10,
    color: AlmostDark,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 21,
    textAlign: "center",
  },
});
export default LoginScreen;
