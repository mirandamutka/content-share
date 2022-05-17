import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { FC, useState } from "react";

interface IButton {
 onPress: () => void
 label: string
 outline: boolean
}

const Button: FC<IButton> = (props) => {
 return (
    <TouchableOpacity onPress={props.onPress} style={props.outline ? [styles.button, styles.buttonOutline] : styles.button}>
      <Text style={props.outline ? [styles.buttonText, styles.buttonOutlineText] : styles.buttonText}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#77ABB7",
    borderRadius: 20,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },

  buttonText: {
    textTransform: "uppercase",
    color: "white",
    fontFamily: "Inter-Bold",
    fontSize: 18,
  },

  buttonOutline: {
   backgroundColor: "none",
   borderColor: "#77ABB7",
   borderWidth: 3,
 },

 buttonOutlineText: {
   color: "#77ABB7",
 },
});
