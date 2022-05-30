import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Button from "./Button";

interface IModalView {
  modalVisible: boolean;
  setModalVisible: (modal: boolean) => void;
  modalContent: any;
}

const ModalView: FC<IModalView> = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {props.modalContent}
        </View>
      </View>
    </Modal>
  );
};

export default ModalView;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "80%",
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
});
