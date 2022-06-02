import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProfileOverview from "./ProfileOverview";

const TabFeed = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.feedTitle}>Today</Text>
      <View style={styles.feedContainer}>
      <Text style={styles.feedContent}>No events...</Text>
      </View>
    </View>
  );
};

export default TabFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  feedContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginVertical: 10,
  },

  feedTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    color: "white",
    marginLeft: 20
  },

  feedContent: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "white",
  }
});
