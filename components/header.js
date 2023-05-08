import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";

const { width, height } = Dimensions.get("window");

export default function Header(props) {
  const [menu, set_menu] = React.useState(true);

  return (
    <View>
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
            props.navigation.navigate("Menu");
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
      {props.page != "settings" ? (
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ backgroundColor: "#ebeef0" }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Home");
            }}
            style={styles.btn}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                marginHorizontal: 2,
              }}
              source={
                props.page == "home"
                  ? require("../assets/logo_yello.png")
                  : require("../assets/logo_blue.png")
              }
            />
            <Text
              style={[
                styles.btnText,
                props.page == "home"
                  ? { color: "#fbaf3c" }
                  : { color: "#2c7be5" },
              ]}
            >
              الرئيسية
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Article");
            }}
            style={styles.btn}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                marginHorizontal: 2,
              }}
              source={
                props.page == "article"
                  ? require("../assets/article_yello.png")
                  : require("../assets/article_blue.png")
              }
            />
            <Text
              style={[
                styles.btnText,
                props.page == "article"
                  ? { color: "#fbaf3c" }
                  : { color: "#2c7be5" },
              ]}
            >
              المقالات
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Wear");
            }}
            style={styles.btn}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                marginHorizontal: 2,
              }}
              source={
                props.page == "wear"
                  ? require("../assets/wear_yello.png")
                  : require("../assets/wear_blue.png")
              }
            />
            <Text
              style={[
                styles.btnText,
                props.page == "wear"
                  ? { color: "#fbaf3c" }
                  : { color: "#2c7be5" },
              ]}
            >
              شو نلبس بكرى
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Favorite");
            }}
            style={styles.btn}
          >
            <Image
              style={{
                width: 25,
                height: 25,
                marginHorizontal: 2,
              }}
              source={
                props.page == "favorite"
                  ? require("../assets/favorite_yello.png")
                  : require("../assets/favorite_blue.png")
              }
            />
            <Text
              style={[
                styles.btnText,
                props.page == "favorite"
                  ? { color: "#fbaf3c" }
                  : { color: "#2c7be5" },
              ]}
            >
              المفضلة
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    paddingHorizontal: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 1,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    // color: '#2c7be5',
  },
});
