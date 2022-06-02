import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonCircle from "./ButtonCircle";
import ProfileAccounts from "./ProfileAccounts";
import { Context } from "../context/Context";
import Button from "./Button";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import ModalView from "./ModalView";
import ProfileSchedule from "./ProfileSchedule";

interface IProfileEdit {
  createProfile: boolean;
  setCreateProfile: any;
}

const ProfileEdit: FC<IProfileEdit> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [accountArray, setAccountArray] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [scheduleEntry, setScheduleEntry] = useState({});
  const [twitchNameFromFB, setTwitchNameFromFB] = useState("");
  const [ytNameFromFB, setYTNameFromFB] = useState("");
  const [twitchName, setTwitchName] = useState("");
  const [ytName, setYTName] = useState("");

  const context = useContext(Context);
  const auth = getAuth();
  const firestore = getFirestore();
  const isFocused = useIsFocused();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addToAccountArray = (type: string) => {
    if (!accountArray.some((el) => el === type)) {
      setAccountArray((accountArray) => [...accountArray, type]);
    }
  };

  const addToScheduleArray = (schedule: any) => {
    setSchedule((scheduleArray) => [...scheduleArray, schedule]);
  };

  const updateAccounts = async () => {
    const uid = auth.currentUser?.uid;
    let id = context?.profileList[context?.index].id;
    let docRef = doc(firestore, "users", uid!, "profiles", id);
    let profileRef = doc(firestore, "profiles", id);
    if (auth.currentUser) {
      await updateDoc(docRef, {
        twitch: twitchName,
        youtube: ytName,
        schedule: schedule
      });
      await updateDoc(profileRef, {
        twitch: twitchName,
        youtube: ytName,
        schedule: schedule
      })
    }
    context?.setUpdateProfile(true);
  };

  const accountsFromFB = async () => {
    if (context?.profileList) {
      setTwitchNameFromFB(context?.profileList[context?.index].twitch);
      setYTNameFromFB(context?.profileList[context?.index].youtube);
    }
  };

  const modalContent = () => {
    return (
      <View>
        <Text style={styles.modalText}>Choose platform</Text>
        <Button
          onPress={() => [
            addToAccountArray("twitch"),
            setModalVisible(!modalVisible),
          ]}
          label={"Twitch"}
          outline={false}
        />
        <Button
          onPress={() => [
            addToAccountArray("youtube"),
            setModalVisible(!modalVisible),
          ]}
          label={"Youtube"}
          outline={true}
        />
      </View>
    );
  };

  useEffect(() => {
    accountsFromFB();
    setSchedule(context?.profileList[context?.index].schedule);
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (context?.profileList[context?.index].twitch !== "") {
        addToAccountArray("twitch");
      }
      if (context?.profileList[context?.index].youtube !== "") {
        addToAccountArray("youtube");
      }
    }
  }, [isFocused]);

  return (
      <TouchableWithoutFeedback
        onPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.container}>
          {modalVisible && (
            <ModalView
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              modalContent={modalContent()}
            />
          )}
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
            );
          })}
          {accountArray.length < 2 && (
            <ButtonCircle onPress={toggleModal} label={"+"} small={true} />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Schedule</Text>
          </View>
          {schedule.map((item: any, index: number) => {
            return <ProfileSchedule key={index} entry={scheduleEntry} setEntry={setScheduleEntry} schedule={schedule} setSchedule={setSchedule} item={item} />
          })}
          <ButtonCircle
            onPress={() => {
              addToScheduleArray(scheduleEntry);
            }}
            label={"+"}
            small={true}
          />
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
      </TouchableWithoutFeedback>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
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

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#3E3939",
  },
});
