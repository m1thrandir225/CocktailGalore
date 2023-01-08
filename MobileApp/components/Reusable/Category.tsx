import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { SetStateAction } from "react";
import {
  AlmostWhite,
  AlmostDark,
  RedLight,
} from "../../constants/globalStyles";
const Category = ({
  title,
  isCurrent,
  setCurrentCategory,
}: {
  title: string;
  isCurrent: boolean;
  setCurrentCategory: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Pressable
      onPress={() => setCurrentCategory(title)}
      style={[
        styles.button,
        { backgroundColor: isCurrent ? RedLight : AlmostWhite },
      ]}
    >
      <Text
        style={[styles.text, { color: isCurrent ? AlmostWhite : AlmostDark }]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 10,
    width: "auto",
  },
  text: {
    fontFamily: "Montserrat_400Regular",
    textAlign: "left",
    fontSize: 18,
  },
});

export default Category;
