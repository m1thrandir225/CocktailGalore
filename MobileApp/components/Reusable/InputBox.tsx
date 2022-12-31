import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { SetStateAction } from "react";
import { AlmostDark } from "../../constants/globalStyles";
import Feather from "@expo/vector-icons/Feather";
const InputBox = ({
  text,
  iconName,
  iconColor,
  onChange,
  isPassword,
}: {
  text: string;
  iconName: any;
  iconColor: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isPassword?: boolean;
}) => {
  return (
    <View style={styles.inputBoxContainer}>
      <Feather name={iconName} size={24} color={iconColor} />
      <TextInput
        style={styles.inputBox}
        placeholder={text}
        secureTextEntry={isPassword}
        onChange={(e: any) => onChange(e.nativeEvent.text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputBoxContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 2,
    borderColor: AlmostDark,
    borderRadius: 8,
    width: "80%",
    marginVertical: 25 / 2,
  },
  inputBox: {
    width: "80%",
    padding: 10,
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
    color: AlmostDark,
    marginLeft: 15,
  },
});
export default InputBox;
