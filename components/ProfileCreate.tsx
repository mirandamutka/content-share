import { StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect } from "react";
import Button from "./Button";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, collection, updateDoc, getDocs } from "firebase/firestore";

interface IProfileCreate {
  createProfile?: boolean
  setCreateProfile?: any
}

const ProfileCreate: FC<IProfileCreate> = (props) => {
  const auth = getAuth();
  const firestore = getFirestore();

  const createProfile = async (type: string) => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const docRef = await addDoc(collection(firestore, "users", uid, "profiles"), {
        type: type,
        twitch: "",
        youtube: "",
        schedule: [],
        games: [],
        genre: [],
        id: ""
      });

      await updateDoc(docRef, {
        id: docRef.id
      })

      props.setCreateProfile(true)
    }
  };

  useEffect(() => {
    props.setCreateProfile(false)
  },[props.createProfile])

  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress={() => createProfile("personal")}
        label={"Create profile"}
        outline={false}
      />
      <Button
        onPress={() => createProfile("fan")}
        label={"Create fan profile"}
        outline={true}
      />
    </View>
  );
};

export default ProfileCreate;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
