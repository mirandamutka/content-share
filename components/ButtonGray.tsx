import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import ButtonSelect from './ButtonSelect'

interface IButtonGray {
 label: string
 selected: number
 index: number
 isSelectable: boolean
}

const ButtonGray: FC<IButtonGray> = (props) => {
  return (
    <View style={props.selected == props.index && props.isSelectable ? [styles.buttonContainer, styles.buttonSelected] : styles.buttonContainer}>
      <Text style={styles.buttonText}>{props.label}</Text>
    </View>
  )
}

export default ButtonGray

const styles = StyleSheet.create({
 buttonContainer: {
  backgroundColor: "#F6F4F4",
  borderRadius: 20,
  padding: 5,
  marginVertical: 5,
  borderColor: "#F6F4F4",
  borderWidth: 3
 },

 buttonSelected: {
  borderColor: "#E54861",
  borderWidth: 3
 },

 buttonText: {
  fontFamily: "Inter-Medium",
  fontSize: 13
 }
})