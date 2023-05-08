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

const { width, height } = Dimensions.get("window");

export default function Link({ route, navigation }) {
  const tags = route.params.tags;
  const link_id = route.params.link_id;
  const [Loading, setLoading] = useState(false);
  const [date, setdate] = useState([]);

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

  useEffect(() => {
    let tags_new = tags.replace("/ar/article.php?tags=", "");
    tags_new = "https://www.p-weather.ps/api/article.php?tags=" + tags_new;
    console.log(tags_new);
    // console.log('start');
    setLoading(true);
    axios
      .get(tags_new)

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

  // const onRefresh = React.useCallback(() => {
  //   var tags_new = tags.replace('/ar/article.php?tags=', '');
  //   console.log('https://www.p-weather.ps/api/article.php?tags=' + tags_new);
  //   setLoading(true);
  //   axios
  //     .get('https://www.p-weather.ps/api/article.php?tags=' + tags_new)

  //     .then(function (response) {
  //       // handle response
  //       //alert(response["data"]);
  //       setdate(response['data']);
  //       // console.log(response['data']);
  //       setLoading(false);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executes at the last of any API call
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} page={"article"} />
      <FlatList
        data={date}
        // numColumns={2}
        keyExtractor={({ id }, index) => id}
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
                // height: height * 0.75 * 0.35,
                height: height * 0.75 * 0.25 - 10,
                flex: 1,
                padding: 1,
                marginBottom: 5,
                // marginLeft: 5,
              }}
            >
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
    // paddingTop: Constants.statusBarHeight,
  },
});
