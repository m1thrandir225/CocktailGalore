import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AlmostDark, RedLight } from "../../constants/globalStyles";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";
import { Raleway_600SemiBold } from "@expo-google-fonts/raleway";
const HomeTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  const [loaded] = useFonts({
    Montserrat_600SemiBold,
    Raleway_600SemiBold,
  });
  if (!loaded) {
    return null;
  }
  return (
    <View style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View style={styles.line} />
        <Text style={styles.text}>{title}</Text>
        <View style={styles.line} />
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    width: 50,
    height: 5,
    backgroundColor: AlmostDark,
    borderRadius: 50 / 2,
  },
  text: {
    fontSize: 28,
    fontFamily: "Montserrat_600SemiBold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: RedLight,
    fontFamily: "Raleway_600SemiBold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
});
export default HomeTitle;
