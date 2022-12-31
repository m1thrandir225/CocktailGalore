import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { WelcomeParamList } from "../../navigation/navigationTypes";
import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import { useFonts } from "expo-font";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";
import {
  Montserrat_700Bold,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { AlmostWhite, RedLight } from "../../constants/globalStyles";
type NavigationProps = StackScreenProps<WelcomeParamList, "Welcome">;

const WelcomeScreen = ({ navigation, route }: NavigationProps) => {
  const [isLoaded, SetIsLoaded] = React.useState(false);
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
  });
  const video = React.useRef(null);
  if (!fontsLoaded) return null;
  return (
    <SafeAreaView style={style.container}>
      <Video
        ref={video}
        source={require("../../assets/welcomeVideo.mp4")}
        resizeMode={ResizeMode.COVER}
        isLooping={true}
        style={style.videoContainer}
        shouldPlay={isLoaded ? true : false}
        onLoad={() => SetIsLoaded(true)}
      />
      <View style={style.overlayContainer}>
        <Image
          source={require("../../assets/logo-light.png")}
          style={style.logo}
        />
        <Text style={style.welcomeTitle}>
          Welcome to{"\n"}
          <Text
            style={{ fontFamily: "Montserrat_700Bold", letterSpacing: 3.5 }}
          >
            GALORE
          </Text>{" "}
        </Text>
        <View style={style.buttonsContainer}>
          <Pressable
            style={style.getStartedButton}
            onPress={() =>
              navigation.navigate("AuthStack", { screen: "Signup" })
            }
          >
            <Text style={style.buttonText}>Get Started</Text>
          </Pressable>
          <Pressable
            style={style.loginButton}
            onPress={() =>
              navigation.navigate("AuthStack", { screen: "Login" })
            }
          >
            <Text style={style.loginText}>Already have an account?</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    bottom: 0,
    zIndex: 100,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "400",
    color: AlmostWhite,
    placeSelf: "center",
    textAlign: "center",
    fontFamily: "Raleway_700Bold",
  },
  logo: {
    marginTop: 75,
    width: 145,
    height: 90,
  },
  buttonsContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: 75,
  },
  getStartedButton: {
    textAlign: "center",
    backgroundColor: RedLight,
    borderRadius: 5,
    width: "80%",
    marginBottom: 25 / 2,
  },
  buttonText: {
    paddingVertical: 10,
    color: AlmostWhite,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 24,
    textAlign: "center",
  },
  loginText: {
    paddingVertical: 10,
    color: AlmostWhite,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 21,
    textAlign: "center",
  },
  loginButton: {
    borderWidth: 2,
    borderColor: RedLight,
    width: "80%",
    borderRadius: 5,
    marginTop: 25 / 2,
  },
});
export default WelcomeScreen;
