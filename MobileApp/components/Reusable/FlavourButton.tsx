import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import {
  AlmostDark,
  AlmostWhite,
  RedDark,
  RedLight,
} from "../../constants/globalStyles";
import { Flavour } from "../../constants/globalTypes";
const FlavourButton = ({
  flavour,
  handleMyFlavour,
}: {
  flavour: Flavour;
  handleMyFlavour: (flavour: Flavour) => void;
}) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Pressable
      key={flavour.id}
      style={[
        styles.flavourButton,
        {
          backgroundColor: selected ? AlmostDark : AlmostWhite,
          borderColor: selected ? RedLight : AlmostDark,
        },
      ]}
      onPress={() => {
        handleMyFlavour(flavour);
        setSelected(!selected);
      }}
    >
      <Text
        style={[
          styles.flavourButtonText,
          { color: selected ? AlmostWhite : AlmostDark },
        ]}
      >
        {flavour.name}
      </Text>
      {selected ? (
        <Feather name="check-circle" size={24} color={AlmostWhite} />
      ) : (
        <Feather name="plus-circle" size={24} color={RedDark} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  flavourButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 25 / 2,
  },
  flavourButtonText: {
    fontSize: 24,
    fontFamily: "Raleway_700Bold",
  },
});

export default FlavourButton;
