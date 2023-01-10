import { StackScreenProps } from "@react-navigation/stack";
import { ResizeMode, Video } from "expo-av";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { AlmostWhite, RedLight } from "../../constants/globalStyles";
import { WelcomeParamList } from "../../navigation/navigationTypes";
import {
  selectAccessToken,
  selectRefreshToken,
} from "../../redux/slices/authSlice";
import { selectUser } from "../../redux/slices/userSlice";

type NavigationProps = StackScreenProps<WelcomeParamList, "Welcome">;

const WelcomeScreen = ({ navigation, route }: NavigationProps) => {
  const [isLoaded, SetIsLoaded] = React.useState<boolean | null>(null);
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);

  const video = React.useRef(null);
  React.useEffect(() => {
    if (accessToken != null && refreshToken != null) {
      if (user != null && user.likedFlavours.length == 0) {
        navigation.navigate("AuthStack", { screen: "Overview" });
      }
    }
  }, []);
  if (isLoaded != null && isLoaded == false) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: AlmostWhite,
        }}
      >
        <ActivityIndicator size="large" color={RedLight} />
      </View>
    );
  }
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
              navigation.navigate("AuthStack", {
                screen: "Login",
              })
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
