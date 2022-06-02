import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, Text } from "react-native";
import ProfileOverview from "../components/ProfileOverview";
import { View } from "../components/Themed";
import { Context } from "../context/Context";

export default function TabSearchScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<any>([]);
  const context = useContext(Context);

  const searchFilter = (text: string) => {
    if (text) {
      const foundData = context?.allProfiles.filter((item: any) => {
        const itemData = item.twitch
          ? item.twitch.toUpperCase()
          : item.youtube.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchResult(foundData);
      setSearchValue(text);
    } else {
      setSearchResult([]);
      setSearchValue(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={28} color={"#2C2727"} />
        <TextInput
          style={styles.searchInput}
          placeholder={"Search..."}
          value={searchValue}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      {searchResult.length < 1 ? (
              <View style={styles.noResultContainer}><Text style={styles.noResult}>No results found</Text></View>
            ) : 
      searchResult.map((item: any) => {
        return (
          <View key={item.id} style={styles.searchResult}>
            {item.twitch !== "" ? (
              <ProfileOverview
                topIcon={"twitch"}
                topText={item.twitch}
                fanIcon={item.type === "fan" ? true : false}
              />
            ) : (
              <ProfileOverview
                topIcon={"youtube-play"}
                topText={item.youtube}
                fanIcon={item.type === "fan" ? true : false}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  searchContainer: {
    backgroundColor: "white",
    width: "80%",
    height: 45,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
  },

  noResultContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  searchInput: {
    height: "80%",
    width: "80%",
    alignSelf: "center",
    fontFamily: "Inter-Regular",
    fontSize: 14,
    outlineStyle: "none",
  },

  searchResult: {
    width: "100%",
    alignItems: "center",
  },

  noResult: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "white"
  }
});
