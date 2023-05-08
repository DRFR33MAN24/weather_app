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
import * as SecureStore from "expo-secure-store";

import Header from "../components/header";

// You can import from local files
import Ads from "../components/ads";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";
const { width, height } = Dimensions.get("window");

export default function Wear({ route, navigation }) {
  const { user_id, active, full_name, url } = route.params ?? "no";
  const isLogin = active != 0 && active != 1 ? false : true;
  const [Loading, setLoading] = useState(false);
  const [data, setdata] = useState("");
  const [selectedId, setselectedId] = useState(-1);

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
  }

  getValueFor("user_id");
  getValueFor("url");
  getValueFor("active");
  getValueFor("full_name");

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    axios
      .get("https://www.p-weather.ps/api/article.php?getwear_tomorrow_last_row")
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setdata(response["data"]);
        // console.log(response['data']);
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

  useEffect(() => {
    // console.log('start');
    setLoading(true);
    axios
      .get("https://www.p-weather.ps/api/article.php?getwear_tomorrow_last_row")
      .then(function (response) {
        // handle response
        // alert(response["data"]);
        setdata(response["data"][0]["body"]);
        console.log(response["data"][0]["body"]);
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
      <Header navigation={navigation} page={"wear"} />
      <View
        style={{
          width: "100%",
          backgroundColor: "#d9d9d9",
          height: height * 0.2,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
        }}
      >
        <Image
          style={{
            height: 200,
            width: 175,
            marginLeft: -25,
            // borderRadius: 13,
            // borderBottomLeftRadius: 25,
            // borderBottomRightRadius: 25,
            resizeMode: "contain",
          }}
          source={require("../assets/002.png")}
        />
        <View
          style={{
            position: "absolute",
            right: 5,
            top: height * 0.1,
          }}
        >
          <Text
            style={{
              // fontFamily: 'Cairo',
              fontSize: 28,
              fontWeight: "700",
              color: "#2687C8",
            }}
          >
            أنا هون لخبركم{" "}
          </Text>
          <Text
            style={{
              // fontFamily: 'Cairo',
              fontSize: 16,
              fontWeight: "800",
              color: "#2687C8",
            }}
          >
            شو لازم تلبسوا بالأيام الجاي!
          </Text>
        </View>
      </View>

      <View
        style={{
          height: height * 0.8,
          backgroundColor: "#2c7be5",
          padding: 10,
        }}
      >
        <Image
          style={{
            height: 200,
            width: width * 0.4,
            // marginLeft: -25,
            // borderRadius: 13,
            // borderBottomLeftRadius: 25,
            // borderBottomRightRadius: 25,
            resizeMode: "contain",
          }}
          source={require("../assets/001.png")}
        />
        <View
          style={{
            position: "absolute",
            top: 25,
            padding: 10,
          }}
        >
          <Text
            style={{
              // fontFamily: 'Cairo',
              fontSize: 16,
              fontWeight: "400",
              color: "white",
            }}
          >
            {data}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
  },
});
