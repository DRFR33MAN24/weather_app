import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import axios from "axios";

// or any pure javascript modules available in npm
export default function Menu({ route, navigation }) {
  const { active } = route.params ?? "no";
  const [Loading, setLoading] = useState(false);
  const [date, setdate] = useState([]);
  const [menu, set_menu] = React.useState(false);

  useEffect(() => {
    // console.log('start');
    setLoading(true);
    axios
      .get("https://www.p-weather.ps/api/article.php?link")
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setdate(response["data"]);
        console.log(response["data"]);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executes at the last of any API call
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 120,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Ionicons
          onPress={() => {
            set_menu(!menu);
            navigation.navigate("Home");
          }}
          name={menu ? "menu" : "close"}
          size={48}
          color="#2687C8"
          style={{
            marginHorizontal: 15,
            paddingTop: Constants.statusBarHeight,
          }}
        />
        <View
          style={{
            position: "absolute",
            display: "flex",
            width: "100%",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <Image
            style={{
              width: 80,
              height: 80,
              // position: 'absolute',
              // left: '50%',
              // resizeMode: 'stretch',
            }}
            source={require("../assets/logo-header.png")}
          />
        </View>
      </View>
      <FlatList
        ListFooterComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
              // console.log('https://www.p-weather.ps' + item.link);
            }}
            style={styles.btn}
          >
            <Ionicons
              name={"settings"}
              size={28}
              color="#2687C8"
              //  style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#2687C8",
                textAlign: "left",
                marginHorizontal: 5,
                // fontFamily: 'Cairo',
              }}
            >
              الإعدادات
            </Text>
          </TouchableOpacity>
        }
        data={date}
        // numColumns={2}
        keyExtractor={({ id }, index) => id}
        style={{
          marginTop: 10,
          padding: 10,
          marginBottom: 25,
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Link", {
                tags: item.link,
                link_id: item.link_id,
              });
              // console.log('https://www.p-weather.ps' + item.link);
            }}
            style={styles.btn}
          >
            <Ionicons
              name={"link"}
              size={28}
              color="#2687C8"
              //  style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#2687C8",
                textAlign: "left",
                marginHorizontal: 5,
                // fontFamily: 'Cairo',
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    paddingHorizontal: 5,
    display: "flex",
    // justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: "row",
    marginHorizontal: 1,
  },
});
