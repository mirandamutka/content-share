import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { FC, useEffect, useState } from "react";

interface IButtonCircle {
  onPress: () => void;
  label: string;
  small?: boolean;
}

const ButtonCircle: FC<IButtonCircle> = (props) => {
  const [selected, setSelected] = useState(false);

  const selectedButton = () => {
    props.onPress();
    setSelected(!selected);
  };

  return props.small ? (
    <TouchableOpacity
      onPress={selectedButton}
      style={[styles.button, styles.small]}
    >
      <Text style={[styles.buttonText, styles.smallText]}>{props.label}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={selectedButton}
      style={selected ? [styles.button, styles.selected] : styles.button}
    >
      <Text style={styles.buttonText}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCircle;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    width: 60,
    height: 60,
    marginRight: 5,
    borderColor: "white",
    borderWidth: 3,
  },

  selected: {
    borderColor: "#E54861",
    borderWidth: 3,
  },

  small: {
    width: 40,
    height: 40,
  },

  buttonText: {
    textTransform: "uppercase",
    color: "#3E3939",
    fontFamily: "Inter-Bold",
    fontSize: 40,
    textAlignVertical: "center",
    textAlign: "center",
  },

  smallText: {
    fontSize: 27
  }
});
