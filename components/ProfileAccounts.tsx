import { StyleSheet, TextInput, View } from "react-native";
import React, { FC, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

interface IProfileAccounts {
  icon: string
  nameFromFB: string
  updateName: string
  setUpdateName: (updateName: string) => void
}

const ProfileAccounts: FC<IProfileAccounts> = (props) => {

  useEffect(() => {
    props.setUpdateName(props.nameFromFB)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <View style={styles.iconContainer}>
            <FontAwesome name={props.icon} size={24} color="black" />
        </View>
        <TextInput
          placeholder={props.nameFromFB !== "" ? props.nameFromFB : "Enter username..."}
          value={props.updateName}
          onChangeText={(text) => props.setUpdateName(text)}
          style={styles.inputText}
        />
      </View>
      <View style={styles.seperator} />
    </View>
  );
};

export default ProfileAccounts;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },

  accountContainer: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 20,
  },

  iconContainer: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },

  inputText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
  },

  seperator: {
    backgroundColor: "#E54861",
    height: 1,
    width: "70%",
    marginVertical: 10,
  },
});
