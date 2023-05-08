import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  RefreshControl,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Item,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { useQuery } from "react-query";

import Header from "../components/header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const iconsArray = [
  ["0", "sunny"],
  ["1", "share"],
  ["2", "sunny"],
];

const icons = new Map(iconsArray);

export default function Favorite({ route, navigation }) {
  const fetchFavorites = async () => {
    const { data } = await axios.get(
      "https://www.p-weather.ps/api/article.php?weather"
    );
    return data;
  };

  const { data, error, isLoading } = useQuery("favorites", fetchFavorites);

  return (
    <View>
      <Header navigation={navigation} page={"favorite"} />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.weather_id}
          renderItem={({ item }) => (
            <>
              <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <Ionicons name={"location"} size={32} color="#2687C8" />
                <Text
                  style={{
                    fontFamily: "Cairo-Regular",
                    fontSize: 20,
                    color: "#2687C8",
                  }}
                >
                  القدس
                </Text>
              </View>
              <View style={styles.favItem}>
                <Image
                  style={{
                    height: "100%",
                    width: "100%",

                    // borderBottomLeftRadius: 25,
                    // borderBottomRightRadius: 25,
                    resizeMode: "stretch",
                  }}
                  source={require("../assets/favImg.png")}
                />
                <View style={styles.favItemInfo}>
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "flex-end",
                    }}
                  >
                    <Ionicons name={"heart"} size={32} color="white" />
                  </View>
                  <View
                    style={{
                      flex: 4,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 32,
                        fontFamily: "Cairo-Bold",
                      }}
                    >
                      {item.temp_day}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Ionicons
                      name={icons.get(item.weather_type)}
                      size={40}
                      color="white"
                    />
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontFamily: "Cairo-Bold",
                      }}
                    >
                      مشمس
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: Constants.statusBarHeight,
    marginHorizontal: 20,
    marginTop: 10,
  },
  favItem: {
    borderRadius: 32,
    height: 150,
    marginBottom: 10,

    backgroundColor: "red",
  },
  favItemInfo: {
    position: "absolute",
    bottom: 4,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
