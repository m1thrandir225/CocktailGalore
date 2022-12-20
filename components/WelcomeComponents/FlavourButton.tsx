import { View, Text, Pressable } from "react-native";
import React from "react";
import { StyleProp, StyleSheet } from "react-native";
import { PlusCircle, CheckCircle } from "react-native-feather";
import { Cream, Tar } from "../../constants/globalStyles";

type Props = {
  text: string;
  containerStyle?: StyleProp<any>;
  textStyle?: StyleProp<any>;
  action?: () => void;
  iconBeforeText?: boolean;
  pressedContainerStyle?: StyleProp<any>;
  pressedTextStyle?: StyleProp<any>;
};

const ButtonWithIcon = ({
  text,
  containerStyle,
  textStyle,
  action,
  iconBeforeText,
  pressedContainerStyle,
  pressedTextStyle,
}: Props) => {
  const [pressed, setPressed] = React.useState<boolean>(false);
  if (iconBeforeText)
    return (
      <Pressable
        onPress={action}
        onPressIn={() => setPressed(!pressed)}
        style={pressed ? pressedContainerStyle : containerStyle}
      >
        <PlusCircle width={20} height={20} color={Tar} />
        <Text style={pressed ? pressedTextStyle : textStyle}>{text}</Text>
      </Pressable>
    );
  return (
    <Pressable
      onPress={action}
      onPressIn={() => setPressed(!pressed)}
      style={pressed ? pressedContainerStyle : containerStyle}
    >
      <Text style={pressed ? pressedTextStyle : textStyle}>{text}</Text>
      {pressed ? (
        <CheckCircle width={20} height={20} color={Cream} />
      ) : (
        <PlusCircle width={20} height={20} color={Tar} />
      )}
    </Pressable>
  );
};

export default ButtonWithIcon;
