import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { HomeStackParamList } from "../../navigation/navigationTypes";
import { Search, ChevronLeft, XCircle } from "react-native-feather";
import { Tar } from "../../constants/globalStyles";
import { StackScreenProps } from "@react-navigation/stack";

type NavigationProps = StackScreenProps<HomeStackParamList>;

const Header = ({
  navigation,
  route,
  goBack,
  closeSearch,
}: {
  navigation: NavigationProps["navigation"];
  route: NavigationProps["route"];
  goBack?: boolean;
  closeSearch?: boolean;
}) => {
  if (closeSearch && !goBack)
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo_tar_header.png")}
          style={{ width: 115, height: 32.26, resizeMode: "contain" }}
        />
        <Pressable onPress={() => navigation.goBack()}>
          <XCircle width={24} height={24} color={Tar} />
        </Pressable>
      </View>
    );
  if (goBack && !closeSearch)
    return (
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <ChevronLeft width={24} height={24} color={Tar} />
        </Pressable>
        <Image
          source={require("../../assets/logo_tar_header.png")}
          style={{ width: 115, height: 32.26, resizeMode: "contain" }}
        />
        <Pressable onPress={() => navigation.navigate("Search")}>
          <Search width={24} height={24} color={Tar} />
        </Pressable>
      </View>
    );
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo_tar_header.png")}
        style={{ width: 115, height: 32.26, resizeMode: "contain" }}
      />
      <Pressable onPress={() => navigation.navigate("Search")}>
        <Search width={24} height={24} color={Tar} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: 82.26,
    padding: 25,
  },
});

export default Header;
