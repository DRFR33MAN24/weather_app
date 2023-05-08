import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import * as SecureStore from "expo-secure-store";
// import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Webview from "../components/webview";
import Header from "../components/header";
import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";

// or any pure javascript modules available in npm
export default function Home({ route, navigation }) {
  const { user_id, active, full_name, url } = route.params ?? "no";
  const isLogin = active != 0 && active != 1 ? false : true;
  const [Loading, setLoading] = useState(false);

  // SplashScreen.preventAutoHideAsync();
  // setTimeout(SplashScreen.hideAsync, 3);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    // console.log(result);
    if (result) {
      // console.log(' == ' + result);
      if (key == "user_id") {
        set_user_id(parseInt(result));
        set_isLogin(true);
        // console.log(_user_id);
        // console.log(_isLogin);
        //alert(_user_id);
      } else if (key == "url") {
        set_url(result);
        // console.log(_url);
        //alert(_url);
      } else if (key == "active") {
        set_active(result);
        // console.log(_active);
        //alert(_active);
      } else if (key == "full_name") {
        set_full_name(result);
        // console.log(_active);
        //alert(_active);
      }
    }
    return result;
  }

  getValueFor("user_id");
  getValueFor("url");
  getValueFor("active");
  getValueFor("full_name");

  return (
    <View style={styles.container}>
      <Header navigation={navigation} page={"home"} />
      <Webview
        name="test home page"
        eturl="https://www.p-weather.ps/api/index.php"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle2: {
    fontSize: 18,
    marginVertical: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
