import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'

interface IButtonSelect {
 selected: boolean
 setSelected?: (selected: boolean) => void
}

const ButtonSelect: FC<IButtonSelect> = (props) => {
  return (
      <View style={props.selected ? [styles.button, styles.buttonSelected] : styles.button} />
  )
}

export default ButtonSelect

const styles = StyleSheet.create({
 button: {
  width: 20,
  height: 20,
  borderColor: "#476D7C",
  borderWidth: 3,
  borderRadius: 50,
  marginHorizontal: 5
 },

 buttonSelected: {
  backgroundColor: "#77ABB7"
 }
})