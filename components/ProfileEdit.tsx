import { StyleSheet, Text, View, Modal, Alert, Pressable } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonCircle from "./ButtonCircle";
import ProfileAccounts from "./ProfileAccounts";
import { Context } from "../context/Context";
import Button from "./Button";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";

interface IProfileEdit {
  createProfile: boolean
  setCreateProfile: any
}

const ProfileEdit: FC<IProfileEdit> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [accountArray, setAccountArray] = useState<any[]>([]);
  const [twitchNameFromFB, setTwitchNameFromFB] = useState("");
  const [ytNameFromFB, setYTNameFromFB] = useState("");
  const [twitchName, setTwitchName] = useState("");
  const [ytName, setYTName] = useState("");
  const context = useContext(Context);
  const auth = getAuth();
  const firestore = getFirestore();
  const isFocused = useIsFocused();

  const toggleModal = () => {
   console.log("Modal pressed")
   setModalVisible(!modalVisible);
  };

  const addToAccountArray = (type: string) => {
    if (!accountArray.some(el => el === type)) {
    setAccountArray(accountArray => [...accountArray, type])
    }
  }

  const updateAccounts = async () => {
    const uid = auth.currentUser?.uid;
    let id = context?.profileList[context?.index].id;
    let docRef = doc(firestore, "users", uid!, "profiles", id);
    console.log("Doc ref: ", docRef)
    if (auth.currentUser) {
      await updateDoc(docRef, {
        twitch: twitchName,
        youtube: ytName
      })
    }
    context?.setUpdateProfile(true)
  };

  const accountsFromFB = async () => {
    if(context?.profileList) {
      setTwitchNameFromFB(context?.profileList[context?.index].twitch)
      setYTNameFromFB(context?.profileList[context?.index].youtube)
    }
  }

  useEffect(() => {
    accountsFromFB()
  }, [])

  useEffect(() => {
    if (isFocused) {
      if (context?.profileList[context?.index].twitch !== "") {
        addToAccountArray("twitch")
      }
      if (context?.profileList[context?.index].youtube !== "") {
        addToAccountArray("youtube")
      }
    }
  }, [isFocused])

  const modalView = () => {
   return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose platform</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => [addToAccountArray("twitch"), setModalVisible(!modalVisible)]}
            >
              <Text style={styles.textStyle}>Twitch</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => [addToAccountArray("youtube"), setModalVisible(!modalVisible)]}
            >
              <Text style={styles.textStyle}>Youtube</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
     {modalView()}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Accounts</Text>
      </View>
      {accountArray.map((item, index) => {
        return (
          <ProfileAccounts  
            key={index}
            icon={item == "twitch" ? "twitch" : "youtube-play"}
            nameFromFB={item == "twitch" ? twitchNameFromFB : ytNameFromFB}
            updateName={item == "twitch" ? twitchName : ytName}
            setUpdateName={item == "twitch" ? setTwitchName : setYTName}
            />
        )
      })}
      {accountArray.length < 2 &&
        <ButtonCircle onPress={toggleModal} label={"+"} small={true} />
      }
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Schedule</Text>
      </View>
      <ButtonCircle onPress={() => {}} label={"+"} small={true} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Filter</Text>
      </View>
      <ButtonCircle onPress={() => {}} label={"+"} small={true} />
      <View style={styles.buttonContainer}>
      <Button 
        onPress={() => updateAccounts()}
        label={"Save Profile"}
        outline={false}
        />
        </View>
    </View>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    width: "100%",
    paddingLeft: 10,
  },

  buttonContainer: {
    width: "80%"
  },

  title: {
    textAlign: "left",
    color: "white",
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
