import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonCircle from "../components/ButtonCircle";
import ProfileCreate from "../components/ProfileCreate";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileEdit from "../components/ProfileEdit";
import { Context } from "../context/Context";

export default function TabProfileScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const firestore = getFirestore();
  // const [profileList, setProfileList] = useState<any[]>([]);
  const [profileEntry, setProfileEntry] = useState({});
  const [createProfile, setCreateProfile] = useState(false);
  const [screen, setScreen] = useState("");
  const [screenChanged, setScreenChanged] = useState(false);

  const context = useContext(Context);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Root");
      })
      .catch((error) => alert(error.message));
  };

  const renderProfiles = async () => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;

      let profileRef = await getDocs(collection(firestore, "users", uid, "profiles"));

      profileRef.forEach((doc) => {
        let data = doc.data();
          if (data.id !== "") {
            if (!context?.profileList.some((el: { id: any; }) => el.id === data.id)) {
              context?.setProfileList((profileList: any) => [...profileList, data]);
            }
          }
      })
    }
  };

  const rerenderProfiles = async () => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;

      let profileRef = await getDocs(collection(firestore, "users", uid, "profiles"));

      profileRef.forEach((doc) => {
        let data = doc.data();
          if (data.id !== "") {
            context?.setProfileList(context?.profileList.slice(context?.profileList.length))
            context?.setProfileList((profileList: any) => [...profileList, data]);
          }
      })
    }
  };

  const switchProfileScreens = (screen: string) => {
    switch (screen) {
      case "create": return (
        <ProfileCreate
          createProfile={createProfile}
          setCreateProfile={setCreateProfile}
        />
      )
      case "edit": return (
        <ProfileEdit 
          createProfile={createProfile}
          setCreateProfile={setCreateProfile} 
        />
      )
    }
  }

  useEffect(() => {
    if (createProfile) {
      renderProfiles();
      console.log("Profile List: ", context?.profileList);
    }
    console.log("CreateProfile: ", createProfile);
  }, [createProfile]);

  useEffect(() => {
    if (context?.updateProfile) {
      rerenderProfiles();
      console.log('Re-rendering... ', context?.profileList)
    }
    console.log("update profile status: ", context?.updateProfile)
    context?.setUpdateProfile(false);
  }, [context?.updateProfile]);

  useEffect(() => {
    console.log("Profile entry: ", profileEntry);
  }, [profileEntry])

  useEffect(() => {
    renderProfiles();
  }, []);

  useEffect(() => {
    console.log("Index: ", context?.index)
    if (context?.profileList) {
      console.log("profile list index: ", context?.profileList[context?.index])
    }
  }, [context?.index])

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.buttonTextContainer}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <View style={styles.buttonCircleContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollView}>
          {context?.profileList.map((item: {}, index: number) => {
            return <ButtonCircle onPress={() => [setScreen("edit"), context?.setIndex(index), setScreenChanged(true)]} label={index.toString()} key={index} />;
          })}
          <ButtonCircle onPress={() => setScreen("create")} label={"+"} />
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        {screenChanged && switchProfileScreens(screen)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#3E3939",
    height: "100%",
  },

  buttonTextContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
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

  scrollView: {
    flex: 1,
  },

  buttonContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
