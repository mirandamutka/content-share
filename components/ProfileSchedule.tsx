import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import ModalView from "./ModalView";
import ButtonSelect from "./ButtonSelect";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import Button from "./Button";
import ButtonGray from "./ButtonGray";
import { Context } from "../context/Context";

interface IProfileSchedule {
  entry: any
  setEntry: any
  schedule: any
  setSchedule: (schedule: any) => void
  item: any
}

const ProfileSchedule: FC<IProfileSchedule> = (props) => {
  const [platform, setPlatform] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [scrollPickerVisible, setScrollPickerVisible] = useState(false);
  const [isSpecificTime, setIsSpecificTime] = useState(false);
  const [isNoTime, setIsNoTime] = useState(false);
  const [repeats, setRepeats] = useState(false);
  const [updateSchedule, setUpdateSchedule] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [time, setTime] = useState<any>();
  const weekdays = [
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
    "Sundays",
  ];

  const context = useContext(Context);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const scrollPickerView = () => {
    return (
      <View>
        <ScrollPicker
          dataSource={["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"]}
          selectedIndex={1}
          onValueChange={(data, selectedIndex) => {
            setTime(data)
          }}
          wrapperHeight={180}
          // wrapperWidth={150}
          wrapperColor="#FFFFFF"
          itemHeight={60}
          highlightColor="#d8d8d8"
          highlightBorderWidth={2}
        />
        <Button
          onPress={() => setScrollPickerVisible(!scrollPickerVisible)}
          label={"Close"}
          outline={false}
        />
      </View>
    );
  };

  const modalContent = () => {
    return (
      <View>
        <Text style={styles.modalText}>Choose platform</Text>
        <Button
          onPress={() => [
            setPlatform("Twitch"),
            setModalVisible(!modalVisible)
          ]}
          label={"Twitch"}
          outline={false}
        />
        <Button
          onPress={() => [
            setPlatform("Youtube"),
            setModalVisible(!modalVisible)
          ]}
          label={"Youtube"}
          outline={true}
        />
      </View>
    );
  };

  const saveSchedule = () => {
    props.setEntry({
      platform: platform,
      isSpecificTime: isSpecificTime,
      isNoTime: isNoTime,
      repeats: repeats,
      repeatDays: selectedDay
    })
    setUpdateSchedule(true);
  }

  useEffect(() => {
    if (updateSchedule) {
      props.setSchedule((schedule: any) => [...schedule, props.entry])
      props.schedule.pop();
      setUpdateSchedule(false)
    }
  }, [updateSchedule])
  
  useEffect(() => {
    if (props.item)
    {
      setPlatform(props.item.platform);
      setIsSpecificTime(props.item.isSpecificTime);
      setIsNoTime(props.item.isNoTime);
      setRepeats(props.item.repeats);
      setSelectedDay(props.item.repeatDays);
      const index = weekdays.findIndex(object => {
        return object === props.item.repeatDays;
      });
      setSelectedIndex(index);
    }

  }, [context?.updateProfile])

  useEffect(() => {
    if (props.item)
    {
      setPlatform(props.item.platform);
      setIsSpecificTime(props.item.isSpecificTime);
      setIsNoTime(props.item.isNoTime);
      setRepeats(props.item.repeats);
      setSelectedDay(props.item.repeatDays);
    }
  }, [])

  return (
    <View style={styles.container}>
      {modalVisible && (
        <ModalView
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalContent={modalContent()}
        />
      )}
      <TouchableOpacity
        onPress={() => {
          toggleModal();
        }}
        style={styles.platformContainer}
      >
        <Text style={styles.platformText}>
          {platform !== "" ? platform : "Platform"}
        </Text>
        <View style={styles.iconContainer}>
          <FontAwesome name="caret-down" />
        </View>
      </TouchableOpacity>
      <View style={styles.timesContainer}>
        <View style={styles.specificTimeContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsSpecificTime(true);
              setIsNoTime(false);
            }}
            style={styles.buttonTextRow}
          >
            <ButtonSelect selected={isSpecificTime} />
            <Text>Specific Time</Text>
          </TouchableOpacity>
          {scrollPickerVisible && (
            <ModalView
              modalVisible={scrollPickerVisible}
              setModalVisible={setScrollPickerVisible}
              modalContent={scrollPickerView()}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsNoTime(true);
            setIsSpecificTime(false);
          }}
          style={styles.buttonTextRow}
        >
          <ButtonSelect selected={isNoTime} />
          <Text>No Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRepeats(true);
          }}
          style={styles.buttonTextRow}
        >
          <ButtonSelect selected={repeats} />
          <Text>Repeats</Text>
        </TouchableOpacity>
        <View style={styles.weekdaysContainer}>
          {weekdays.map((day, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedDay(day);
                  setRepeats(true);
                  setSelectedIndex(index);
                }}
              >
                <ButtonGray label={day} selected={selectedIndex} index={index} isSelectable={repeats} />
              </TouchableOpacity>
            );
          })}
        </View>
        <Button
          onPress={() => {saveSchedule()}}
          label={"Save schedule"}
          outline={false}
          />
      </View>
    </View>
  );
};

export default ProfileSchedule;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10
  },

  platformContainer: {
    backgroundColor: "#F6F4F4",
    width: "80%",
    borderRadius: 20,
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: "15%",
    flex: 1,
  },

  iconContainer: {
    alignSelf: "flex-end",
  },

  timesContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignContent: "flex-start",
    width: "80%",
    alignSelf: "center",
  },

  specificTimeContainer: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },

  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
  },

  platformText: {
    fontFamily: "Inter-Medium",
    alignSelf: "center",
    fontSize: 14,
  },

  buttonTextRow: {
    flexDirection: "row",
    marginVertical: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "#3E3939",
  },
});
