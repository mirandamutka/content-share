import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import ProfileOverview from "../components/ProfileOverview";
import TabFeed from "../components/TabFeed";
import TabFollowing from "../components/TabFollowing";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabHomeScreen({
  navigation,
}: RootTabScreenProps<"TabHome">) {
  const [selectFirstTab, setSelectFirstTab] = useState(true);
  const [selectSecondTab, setSelectSecondTab] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.topNavigation}>
        <TouchableOpacity
          onPress={
            selectFirstTab
              ? () => {}
              : () => {
                  setSelectFirstTab(!selectFirstTab),
                    setSelectSecondTab(!selectSecondTab);
                }
          }
          style={styles.tabContainer}
        >
          <View
            style={selectFirstTab ? styles.selectedTab : styles.unselectedTab}
          >
            <Text style={styles.tabText}>Feed</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            selectSecondTab
              ? () => {}
              : () => {
                  setSelectSecondTab(!selectSecondTab),
                    setSelectFirstTab(!selectFirstTab);
                }
          }
          style={styles.tabContainer}
        >
          <View
            style={selectSecondTab ? styles.selectedTab : styles.unselectedTab}
          >
            <Text style={styles.tabText}>Following</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        {selectFirstTab ? <TabFeed /> : <TabFollowing />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  topNavigation: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-start",
    margin: 10,
  },

  tabContainer: {
    width: "50%",
    alignItems: "center",
  },

  tabText: {
    fontFamily: "Inter-Bold",
    fontSize: 15,
    textTransform: "uppercase",
    marginBottom: 10,
  },

  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#E54861",
    width: "100%",
    alignItems: "center",
  },

  unselectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#E5E5E5",
    width: "100%",
    alignItems: "center",
  },
});
