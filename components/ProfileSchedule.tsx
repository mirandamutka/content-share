import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import ModalView from "./ModalView";
import ButtonSelect from "./ButtonSelect";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import Button from "./Button";
import ButtonGray from "./ButtonGray";

const ProfileSchedule = () => {
  const [platform, setPlatform] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [scrollPickerVisible, setScrollPickerVisible] = useState(false);
  const [timeType, setTimeType] = useState(false);
  const [repeats, setRepeats] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [specificTime, setSpecificTime] = useState<any>();
  const weekdays = [
    "Mondays",
    "Tuesdays",
    "Wednesdays",
    "Thursdays",
    "Fridays",
    "Saturdays",
    "Sundays",
  ];
  const toggleModal = () => {
    console.log("Modal pressed");
    setModalVisible(!modalVisible);
  };

  const scrollPickerView = () => {
    return (
      <View>
        <ScrollPicker
          dataSource={["1", "2", "3", "4", "5", "6"]}
          selectedIndex={1}
          onValueChange={(data, selectedIndex) => {
            setSpecificTime(data);
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
            setModalVisible(!modalVisible),
          ]}
          label={"Twitch"}
          outline={false}
        />
        <Button
          onPress={() => [
            setPlatform("Youtube"),
            setModalVisible(!modalVisible),
          ]}
          label={"Youtube"}
          outline={true}
        />
      </View>
    );
  };

  useEffect(() => {
    console.log("Platform: ", platform);
  }, [platform]);

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
              setTimeType(!timeType);
            }}
            style={styles.buttonTextRow}
          >
            <ButtonSelect selected={!timeType} />
            <Text>Specific Time</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setScrollPickerVisible(!scrollPickerVisible);
            }}
          >
            <Text>Press me</Text>
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
            setTimeType(!timeType);
          }}
          style={styles.buttonTextRow}
        >
          <ButtonSelect selected={timeType} />
          <Text>No Time</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setRepeats(!repeats);
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
                  setSelectedDay(index);
                  setRepeats(true);
                }}
              >
                <ButtonGray label={day} selected={selectedDay} index={index} isSelectable={repeats} />
              </TouchableOpacity>
            );
          })}
        </View>
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
