import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";

type InputFields = InputFieldProps[];

const FormGroup = ({ inputFields }: { inputFields: InputFields }) => {
  return (
    <ScrollView style={styles.container}>
      {inputFields.map((inputField: InputFieldProps, idx: number) => (
        <InputField {...inputField} key={idx} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
});
export default FormGroup;
