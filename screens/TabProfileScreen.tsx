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
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileEdit from "../components/ProfileEdit";

export default function TabProfileScreen() {
  const auth = getAuth();
  const navigation = useNavigation();
  const firestore = getFirestore();
  const [profileList, setProfileList] = useState<any[]>([]);
  const [profileEntry, setProfileEntry] = useState({});
  const [createProfile, setCreateProfile] = useState(false);
  const [screen, setScreen] = useState("");
  const [index, setIndex] = useState(Number);

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

      const profileRef = await getDocs(collection(firestore, uid));

      profileRef.forEach((doc) => {
        let data = doc.data();
          if (data.id !== "") {
            if (!profileList.some(el => el.id === data.id)) {
              setProfileList(profileList => [...profileList, data]);
            }
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
          profileEntry={profileEntry} 
          index={index} 
          createProfile={createProfile}
          setCreateProfile={setCreateProfile} 
        />
      )
    }
  }

  useEffect(() => {
    if (createProfile) {
      renderProfiles();
      console.log("Profile List: ", profileList);
    }
    console.log("CreateProfile: ", createProfile);
  }, [createProfile]);

  useEffect(() => {
    renderProfiles();
  }, []);

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
          {profileList.map((item, index) => {
            return <ButtonCircle onPress={() => [setScreen("edit"), setProfileEntry(profileEntry => ({...profileEntry, ...item})), setIndex(index), setCreateProfile(!createProfile)]} label={""} key={index} />;
          })}
          <ButtonCircle onPress={() => setScreen("create")} label={"+"} />
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        {switchProfileScreens(screen)}
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
