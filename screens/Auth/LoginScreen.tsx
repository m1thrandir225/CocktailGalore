import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/navigationTypes";
import HeaderLoginSignup from "../../components/Login-Signup-Components/Header";
import { Tar, Cream, globalStyles } from "../../constants/globalStyles";
import { Lock, Mail, User } from "react-native-feather";
import FormGroup from "../../components/Login-Signup-Components/FormGroup";
import ContinueWithButton from "../../components/Login-Signup-Components/ContinueButton";
type NavigationProps = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen = ({ navigation, route }: NavigationProps) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <HeaderLoginSignup navigation={navigation} route={route} />
        <Text style={styles.title}> Login </Text>
        <FormGroup
          inputFields={[
            {
              icon: (
                <Mail
                  width={15}
                  height={15}
                  color={Tar}
                  style={{ marginRight: 6 }}
                />
              ),
              placeholder: "Enter Email",
              onChange: (text) => setEmail(text),
            },
            {
              icon: (
                <Lock
                  width={15}
                  height={15}
                  color={Tar}
                  style={{ marginRight: 6 }}
                />
              ),
              placeholder: "Enter Password",
              onChange: (text) => setPassword(text),
            },
          ]}
        />
        <View style={styles.buttonsContainer}>
          <Pressable style={globalStyles.filledButtonContainerTar}>
            <Text style={globalStyles.filledButtonTextTar}> Continue </Text>
          </Pressable>
          <Pressable style={globalStyles.outlinedButtonContainerTar}>
            <Text
              style={globalStyles.outlinedButtonTextTar}
              onPress={() => navigation.push("SignUp")}
            >
              Don't Have an Account ?
            </Text>
          </Pressable>
        </View>
        <View style={styles.or}>
          <View
            style={{ backgroundColor: Tar, height: 1, flex: 1, marginLeft: 25 }}
          ></View>
          <Text
            style={{
              marginLeft: 16,
              marginRight: 16,
              fontSize: 18,
              fontWeight: "400",
              color: Tar,
            }}
          >
            Or
          </Text>
          <View
            style={{
              backgroundColor: Tar,
              height: 1,
              flex: 1,
              marginRight: 25,
            }}
          ></View>
        </View>
        <View style={styles.continueContainer}>
          <ContinueWithButton
            image={require("../../assets/google.png")}
            text="Continue With Google"
          />
          <ContinueWithButton
            image={require("../../assets/twitter.png")}
            text="Continue With Twitter"
          />
          <ContinueWithButton
            image={require("../../assets/facebook.png")}
            text="Continue With Meta"
          />
        </View>
        <Image
          style={{ resizeMode: "stretch", width: "100%", height: 82 }}
          source={require("../../assets/loginWaves.png")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cream,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Tar,
    textAlign: "center",
    marginTop: 68,
    marginBottom: 30,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 25,
    marginRight: 25,
  },
  or: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 25,
  },
  continueContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 25,
    marginRight: 25,
  },
});

export default LoginScreen;
