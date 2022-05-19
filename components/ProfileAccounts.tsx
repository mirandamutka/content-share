import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";

interface IProfileAccounts {
  type: string
  profileEntry: any
  nameFromFB: string
  createProfile: boolean
  setCreateProfile: any
}

const ProfileAccounts: FC<IProfileAccounts> = (props) => {
  const auth = getAuth();
  const firestore = getFirestore();
  const uid = auth.currentUser?.uid;
  const [userName, setUserName] = useState("");
  let id = props.profileEntry.id;
  let docRef: any;
  if (uid)
  {
    docRef = doc(firestore, uid, id);
  }

  const updateAccounts = async (username: string) => {
    if (auth.currentUser) {
      props.type == "twitch" ? 
      await updateDoc(docRef, {
        twitch: username,
      })
      :
      await updateDoc(docRef, {
        youtube: username,
      })
    }
  };

  useEffect(() => {
    console.log("username: ", userName);
    if (userName !== "") {
      updateAccounts(userName)
    }
  }, [userName]);

  return (
    <View style={styles.container}>
      <View style={styles.accountContainer}>
        <View style={styles.iconContainer}>
          {props.type == "twitch" ? (
            <FontAwesome name="twitch" size={24} color="black" />
          ) : (
            <FontAwesome name="youtube-play" size={24} color="black" />
          )}
        </View>
        <TextInput
          placeholder={props.nameFromFB !== "" ? props.nameFromFB : "Enter username..."}
          style={styles.inputText}
          onSubmitEditing={(value) => [
            setUserName(value.nativeEvent.text),
          ]}
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
