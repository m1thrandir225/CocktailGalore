import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/navigationTypes";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Cream, Tar, globalStyles } from "../../constants/globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Lock, Mail, User } from "react-native-feather";
import HeaderLoginSignup from "../../components/Login-Signup-Components/Header";
import FormGroup from "../../components/Login-Signup-Components/FormGroup";
import ContinueWithButton from "../../components/Login-Signup-Components/ContinueButton";

type NavigationProps = NativeStackScreenProps<AuthStackParamList, "SignUp">;

const SignUpScreen = ({ navigation, route }: NavigationProps) => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.container}>
        <HeaderLoginSignup navigation={navigation} route={route} />
        <Text style={style.title}> Sign Up </Text>
        <FormGroup
          inputFields={[
            {
              icon: (
                <User
                  width={15}
                  height={15}
                  color={Tar}
                  style={{ marginRight: 6 }}
                />
              ),
              placeholder: "Enter Name",
              onChange: (text) => setName(text),
            },
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
        <View style={style.buttonsContainer}>
          <Pressable style={globalStyles.filledButtonContainerTar}>
            <Text style={globalStyles.filledButtonTextTar}> Continue </Text>
          </Pressable>
          <Pressable
            style={globalStyles.outlinedButtonContainerTar}
            onPress={() => navigation.push("Login")}
          >
            <Text style={globalStyles.outlinedButtonTextTar}>
              Already Have an Account ?
            </Text>
          </Pressable>
        </View>
        <View style={style.or}>
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
        <View style={style.continueContainer}>
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
          source={require("../../assets/signupWaves.png")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
  waves: {},
});
export default SignUpScreen;
