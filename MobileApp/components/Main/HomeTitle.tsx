import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AlmostDark, RedLight } from "../../constants/globalStyles";

const HomeTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View style={{ marginTop: 25 }}>
      <View style={styles.container}>
        <View
          style={[
            styles.line,
            { borderTopRightRadius: 50 / 2, borderBottomRightRadius: 50 / 2 },
          ]}
        />
        <Text style={styles.text}>{title}</Text>
        <View
          style={[
            styles.line,
            { borderTopLeftRadius: 50 / 2, borderBottomLeftRadius: 50 / 2 },
          ]}
        />
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
    height: 4,
    backgroundColor: AlmostDark,
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
