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
import { MaterialIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

export default function Article({ route, navigation }) {
  const { user_id, active, full_name, url } = route.params ?? "no";
  const isLogin = active != 0 && active != 1 ? false : true;
  const [Loading, setLoading] = useState(false);
  const [date, setdate] = useState([]);
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
      .get(
        "https://www.p-weather.ps/api/article.php?article&first_number=0&last_number=5"
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setdate(response["data"]);
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
      .get(
        "https://www.p-weather.ps/api/article.php?article&first_number=0&last_number=5"
      )
      .then(function (response) {
        // handle response
        //alert(response["data"]);
        setdate(response["data"]);
        //console.log(response["data"]);
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
      <Header navigation={navigation} page={"article"} />
      <View>
        <Image
          style={{
            height: height * 0.75 * 0.3 - 10,
            // borderRadius: 13,
            // borderBottomLeftRadius: 25,
            // borderBottomRightRadius: 25,
            resizeMode: "cover",
          }}
          source={{
            uri: "https://www.p-weather.ps/photo/article/1671433852361.jpg",
          }}
        />
      </View>
      <FlatList
        data={date}
        // numColumns={2}
        keyExtractor={(item) => item.article_id}
        style={{ marginTop: 10, padding: 10 }}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                // paddingRight: 15,
                color: "#2687C8",
                textAlign: "left",
                bottom: 0,
                left: 0,
                width: "100%",
                // fontFamily: 'Cairo',
              }}
            >
              {item.title}
            </Text>
            <View
              style={{
                // باقس 70% نقسم على 3 أقسام
                height: height * 0.75 * 0.25 - 10,
                flex: 1,
                padding: 1,
                marginBottom: 5,
                // marginLeft: 5,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  flexDirection: "row",
                  // width: "100%",
                  // height: "100%",
                  backgroundColor: "white",
                  borderTopLeftRadius: 16,

                  zIndex: 1000,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    margin: 5,
                  }}
                >
                  <Text
                    style={{ alignSelf: "center", fontFamily: "Cairo-Regular" }}
                  >
                    مشاركة
                  </Text>
                  <MaterialIcons name="share" size={18} color="#2687C8" />
                </View>
                <View style={{ flexDirection: "row", margin: 5 }}>
                  <Text
                    style={{ alignSelf: "center", fontFamily: "Cairo-Regular" }}
                  >
                    حفظ
                  </Text>
                  <MaterialIcons name="save-alt" size={18} color="#2687C8" />
                </View>
              </View>
              <Image
                style={{
                  height: height * 0.75 * 0.25 - 10,
                  borderRadius: 13,
                  // borderBottomLeftRadius: 25,
                  // borderBottomRightRadius: 25,
                  // resizeMode: 'cover',
                }}
                source={{
                  uri:
                    "https://www.p-weather.ps/photo/article/" +
                    item.featured_image,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                // paddingRight: 15,
                color: "#2c7be5",
                textAlign: "left",
                bottom: 0,
                left: 0,
                // paddingBottom: 15,
                width: "100%",
                // fontFamily: 'Cairo',
              }}
            >
              {item.body.substr(0, 150)}
            </Text>
            <Pressable onPress={() => {}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  // paddingRight: 15,
                  color: "#fbaf3c",
                  textAlign: "left",
                  bottom: 0,
                  left: 0,
                  paddingBottom: 15,
                  width: "100%",
                  // fontFamily: 'Cairo',
                }}
              >
                .... أقراء المزيد
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
