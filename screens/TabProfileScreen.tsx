import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProfileCreate from "../components/ProfileCreate";
import { getFirestore, collection, getDocs, DocumentData } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileEdit from "../components/ProfileEdit";
import { Context } from "../context/Context";

export default function TabProfileScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const firestore = getFirestore();
  const [createProfile, setCreateProfile] = useState(false);

  const context = useContext(Context);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        context?.setProfileList([]);
        context?.setCurrentUser("");
        navigation.replace("Root");
      })
      .catch((error) => alert(error.message));
  };

  const renderProfiles = async () => {
      let profileRef = await getDocs(
        collection(firestore, "users", context?.currentUser, "profiles")
      );

      let allProfilesRef = await getDocs(
        collection(firestore, "profiles")
      );

      profileRef.forEach((doc) => {
        let data = doc.data();
        if (data.id !== "") {
          if (
            !context?.profileList.some((el: { id: any }) => el.id === data.id)
          ) {
            context?.setProfileList((profileList: any) => [
              ...profileList,
              data,
            ]);
          }
        }
      });
      allProfilesRef.forEach((doc) => {
        let data = doc.data();
          if (
            !context?.allProfiles.some((el: { id: any }) => el.id === data.id)
          ) {
            context?.setAllProfiles((allProfiles: any) => [
              ...allProfiles,
              data,
            ]);
          }
        });
  };

  const rerenderProfiles = async () => {
      let profileRef = await getDocs(
        collection(firestore, "users", context?.currentUser, "profiles")
      );

      let allProfilesRef = await getDocs(
        collection(firestore, "profiles")
      );

      profileRef.forEach((doc) => {
        let data = doc.data();
        if (data.id !== "") {
          context?.setProfileList(
            context?.profileList.slice(context?.profileList.length)
          );
          context?.setProfileList((profileList: any) => [...profileList, data]);
        }
      });
      allProfilesRef.forEach((doc) => {
        let data = doc.data();
        if (data.id !== "") {
          context?.setAllProfiles(
            context?.allProfiles.slice(context?.allProfiles.length)
          );
          context?.setAllProfiles((allProfiles: any) => [...allProfiles, data]);
        }
      });
  };

  useEffect(() => {
    if (createProfile) {
      renderProfiles();
      console.log("Profile List: ", context?.profileList);
      console.log("All profiles: ", context?.allProfiles);
    }
    console.log("CreateProfile: ", createProfile);
  }, [createProfile]);

  useEffect(() => {
    if (context?.updateProfile) {
      rerenderProfiles();
      console.log("Re-rendering... ", context?.profileList);
      console.log("Re-render all profiles... ", context?.allProfiles);
    }
    console.log("update profile status: ", context?.updateProfile);
    context?.setUpdateProfile(false);
  }, [context?.updateProfile]);

  useEffect(() => {
    renderProfiles();
  }, []);

  useEffect(() => {
    console.log("Index: ", context?.index);
    if (context?.profileList) {
      console.log("profile list index: ", context?.profileList[context?.index]);
    }
  }, [context?.index]);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.buttonTextContainer}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        {context?.profileList.length <= 0 ? (
          <ProfileCreate
            createProfile={createProfile}
            setCreateProfile={setCreateProfile}
          />
        ) : (
          <ScrollView style={styles.scrollViewContainer} contentContainerStyle={{ alignItems: "center" }}>
          <ProfileEdit
            createProfile={createProfile}
            setCreateProfile={setCreateProfile}
          />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E3939",
    // height: "100%",
    alignItems: "center"
  },

  buttonTextContainer: {
    alignSelf: "flex-end",
    padding: 10,
  },

  buttonText: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    textTransform: "uppercase",
    color: "white",
  },

  buttonCircleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    flex: 1,
    padding: 10,
  },

  buttonContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollViewContainer: { 
    flex: 1,
    width: "100%",
    height: "100%"
  },
});
