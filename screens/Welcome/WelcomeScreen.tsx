import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Video, AVPlaybackStatus } from "expo-av";
import { ResizeMode } from "expo-av";
import { globalStyles } from "../../constants/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { WelcomeStackParamList } from "../../navigation/navigationTypes";

type NavigationProps = NativeStackScreenProps<WelcomeStackParamList, "Welcome">;

const WelcomeScreen = ({ navigation, route }: NavigationProps) => {
  const insets = useSafeAreaInsets();
  const video = React.useRef(null);
  const navigator = useNavigation();
  const [isLoaded, SetIsLoaded] = React.useState<boolean>(false);
  return (
    <SafeAreaView style={style.container && { paddingTop: insets.top }}>
      <StatusBar hidden={false} translucent={true} />
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
        <Image style={style.logo} source={require("../../assets/logo.png")} />
        <Text style={style.welcomeTitle}> Welcome to, Galore </Text>
        <View style={style.buttonsContainer}>
          <Pressable
            style={globalStyles.filledButtonContainer}
            onPress={() => navigation.navigate("Auth", { screen: "SignUp" })}
          >
            <Text style={globalStyles.filledButtonText}>Get Started</Text>
          </Pressable>
          <Pressable
            style={globalStyles.outlinedButtonContainer}
            onPress={() => navigation.navigate("Auth", { screen: "Login" })}
          >
            <Text style={globalStyles.outlinedButtonText}>
              Already have an account?
            </Text>
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
    color: "white",
    placeSelf: "center",
  },
  logo: {
    marginTop: 132,
    width: 183,
    height: 73,
  },
  buttonsContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: 70,
    gap: 20,
  },
});
export default WelcomeScreen;
