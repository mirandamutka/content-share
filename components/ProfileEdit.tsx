import { StyleSheet, Text, View, Modal, Alert, Pressable } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonCircle from "./ButtonCircle";
import ProfileAccounts from "./ProfileAccounts";
import { Context } from "../context/Context";

interface IProfileEdit {
  createProfile: boolean
  setCreateProfile: any
}

const ProfileEdit: FC<IProfileEdit> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [accountArray, setAccountArray] = useState<any[]>([]);
  const [twitchNameFromFB, setTwitchNameFromFB] = useState("");
  const [ytNameFromFB, setYTNameFromFB] = useState("");
  const context = useContext(Context);
  // let twitchNameFromFB = context?.profileList[props.index].twitch;
  // let ytNameFromFB = context?.profileList[props.index].youtube;

  const toggleModal = () => {
   console.log("Modal pressed")
   setModalVisible(!modalVisible);
  };

  const addToAccountArray = (type: string) => {
    if (!accountArray.some(el => el === type)) {
    setAccountArray(accountArray => [...accountArray, type])
    }
  }

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

  useEffect(() => {
    setAccountArray([]);
    console.log("Context index: ", context?.index)
  }, [context?.index])

  useEffect(() => {
      setTwitchNameFromFB(context?.profileList[context?.index].twitch)
      setYTNameFromFB(context?.profileList[context?.index].youtube)
      console.log("Names: ", twitchNameFromFB, ytNameFromFB)
  }, [context?.index])

  return (
    <View style={styles.container}>
     {modalView()}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Accounts</Text>
      </View>
      {accountArray.map((item, index) => {
        return (
          <ProfileAccounts 
            type={item} 
            key={index}
            nameFromFB={item == "twitch" ? twitchNameFromFB : ytNameFromFB}
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
