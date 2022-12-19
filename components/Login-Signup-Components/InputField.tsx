import {
  KeyboardAvoidingView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import React, { SetStateAction } from "react";
import * as Icon from "react-native-feather";
import { Cream, Tar } from "../../constants/globalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type InputFieldProps = {
  icon: any;
  placeholder: string;
  onChange: React.Dispatch<SetStateAction<string>>;
};

const InputField = ({ icon, placeholder, onChange }: InputFieldProps) => {
  const insit = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={style.container} behavior="height">
      {icon}
      <TextInput
        style={style.text}
        placeholder={placeholder}
        onChangeText={onChange}
      />
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Cream,
    elevation: 5,
    marginVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "auto",
    marginLeft: 25,
    marginRight: 25,
  },
  text: {
    paddingTop: 9,
    paddingBottom: 9,
    fontSize: 14,
    color: Tar,
    fontWeight: "400",
  },
});
export default InputField;
