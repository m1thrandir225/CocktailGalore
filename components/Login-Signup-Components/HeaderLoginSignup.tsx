import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { ChevronLeft } from "react-native-feather";
import { Cream, Tar } from "../../constants/globalStyles";
import {
  AuthStackParamList,
  WelcomeStackParamList,
} from "../../navigation/navigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";

type NavigationProps = StackScreenProps<WelcomeStackParamList>;
const HeaderLoginSignup = ({ navigation, route }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.popToTop()}
      >
        <ChevronLeft
          style={styles.backButtonIcon}
          width={15}
          height={15}
          color={Cream}
        />
      </Pressable>
      <Image
        style={{ width: 183, height: 73 }}
        source={require("../../assets/logo_tar.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
  },
  backButton: {
    position: "absolute",
    left: 25,
    padding: 8,
    height: 31,
    width: 31,
    borderRadius: 31 / 2,
    backgroundColor: Tar,
  },
  backButtonIcon: {},
});

export default HeaderLoginSignup;
