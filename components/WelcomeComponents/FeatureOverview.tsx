import {
  View,
  Text,
  ImageSourcePropType,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { Tar } from "../../constants/globalStyles";

const FeatureOverview = ({
  icon,
  text,
}: {
  icon: ImageSourcePropType;
  text: string;
}) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 75,
    width: 284,
  },
  icon: {
    width: 53,
    height: 43,
    resizeMode: "contain",
  },
  text: {
    fontSize: 18,
    fontWeight: "400",
    color: Tar,
    marginLeft: 25,
  },
});

export default FeatureOverview;
