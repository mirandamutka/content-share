import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useContext } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { Context } from '../context/Context'

interface IPRofileOverview {
 topText?: string
 bottomText?: string
 topIcon?: any
 bottomIcon?: any
 fanIcon?: any
}

const ProfileOverview: FC<IPRofileOverview> = (props) => {
 const context = useContext(Context);

  return (
    <View style={styles.container}>
     {props.fanIcon && <View style={styles.fanContainer}><FontAwesome name={"star"} size={20} color="#E54861" /></View>}
      <View style={styles.contentContainer}>
       {props.topIcon && <FontAwesome name={props.topIcon} size={24} color="black" />}
       <Text style={styles.textStyle}>{props.topText}</Text>
      </View>
      <View style={styles.seperator} />
      <View style={styles.contentContainer}>
       {props.bottomIcon && <FontAwesome name={props.bottomIcon} size={24} color="black" />}
       <Text style={styles.textStyle}>{props.bottomText}</Text>
      </View>
    </View>
  )
}

export default ProfileOverview

const styles = StyleSheet.create({
 container: {
  backgroundColor: "white",
  padding: 10,
  margin: 10,
  borderRadius: 20,
  width: "90%",
 },

 fanContainer: {
   position: "absolute",
   top: 10,
   right: 10,
 },

 contentContainer: {
  marginLeft: 30,
  paddingVertical: 5,
  flexDirection: "row"
 },

 textStyle: {
   fontFamily: "Inter-Regular",
   fontSize: 12,
   marginLeft: 10,
   marginTop: 5,
   textTransform: "uppercase",
 },


 seperator: {
  height: 1,
  width: "80%",
  backgroundColor: "#E54861",
  alignSelf: "center"
 }
})