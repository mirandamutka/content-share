import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TabFollowing = () => {
  return (
    <View style={styles.followingContainer}>
      <Text style={styles.followingText}>You don't follow any profiles yet!</Text>
    </View>
  )
}

export default TabFollowing

const styles = StyleSheet.create({
  followingContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },

  followingText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "white"
  }
})