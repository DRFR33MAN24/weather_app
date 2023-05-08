import React, { useState, useEffect, useContext } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { Switch } from "react-native-switch";
import * as SecureStore from "expo-secure-store";
import Toggle from "react-native-toggle-element";
import Header from "../components/header";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

import Context from "../Context/Context";

const Settings = ({ route, navigation }) => {
  const [isEnabledWear, setIsEnabledWear] = useState(true);
  const [isEnabledReports, setIsEnabledReports] = useState(true);
  const [isEnabledCast, setIsEnabledCast] = useState(true);

  const { setTheme, theme } = useContext(Context);

  useEffect(() => {
    (async function () {
      const reports = await getValueFor("reports");
      const cast = await getValueFor("detailed_cast");
      const wear = await getValueFor("what_to_wear");

      if (reports) {
        setIsEnabledReports(reports == "true" ? true : false);
      }

      if (wear) {
        setIsEnabledWear(wear == "true" ? true : false);
      }
      if (cast) {
        setIsEnabledCast(cast == "true" ? true : false);
      }
    })();
  }, []);
  const toggleReports = () => {
    setIsEnabledReports((previousState) => {
      save("reports", JSON.stringify(!previousState));
      return !previousState;
    });
  };
  const toggleCast = () => {
    setIsEnabledCast((previousState) => {
      save("detailed_cast", JSON.stringify(!previousState));
      return !previousState;
    });
  };
  const toggleWear = () => {
    setIsEnabledWear((previousState) => {
      save("what_to_wear", JSON.stringify(!previousState));
      return !previousState;
    });
  };

  // SplashScreen.preventAutoHideAsync();
  // setTimeout(SplashScreen.hideAsync, 3);

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);

    return result;
  }

  return (
    <View>
      <Header navigation={navigation} page={"settings"} />
      <View style={styles.container}>
        <View style={styles.settingsItems}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="save-alt" size={32} color="#2687C8" />
            <Text style={styles.text}>المحفوظات</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Text style={styles.text}>55</Text>
          </View>
        </View>
        <View style={styles.settingsItems}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name={"contrast"} size={32} color="#2687C8" />
            <Text style={styles.text}>المظهر</Text>
          </View>
          <View style={{ alignSelf: "center" }}>
            <Toggle
              value={theme == "light" ? true : false}
              onPress={(newState) => {
                if (theme == "light") {
                  setTheme("dark");
                } else {
                  setTheme("light");
                }
              }}
              rightComponent={<Text style={styles.textSwitch}>اساسي</Text>}
              leftComponent={<Text style={styles.textSwitch}>ليلي</Text>}
              trackBar={{
                width: 100,
                height: 30,
                activeBackgroundColor: "#A9DCFF",
                inActiveBackgroundColor: "#A9DCFF",
              }}
              thumbButton={{
                width: 50,
                height: 30,
                activeBackgroundColor: "#2687C8",
                inActiveBackgroundColor: "#2687C8",
              }}
            />
          </View>
        </View>
        <View style={styles.settingsItemsMulti}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name={"notifications"} size={32} color="#2687C8" />
            <Text style={styles.text}>الاشعارات</Text>
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.text}>هطول الامطار</Text>
            <Switch
              onValueChange={toggleCast}
              value={isEnabledCast}
              renderActiveText={false}
              renderInActiveText={false}
              backgroundActive={"#A9DCFF"}
              backgroundInactive={"#D2D2D2"}
              circleActiveColor={"#2687C8"}
              circleInActiveColor={"#7A7A7A"}
            />
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.text}>وجود اعاصير</Text>
            <Switch
              onValueChange={toggleReports}
              value={isEnabledReports}
              renderActiveText={false}
              renderInActiveText={false}
              backgroundActive={"#A9DCFF"}
              backgroundInactive={"#D2D2D2"}
              circleActiveColor={"#2687C8"}
              circleInActiveColor={"#7A7A7A"}
            />
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.text}>اشعارات المقالات</Text>
            <Switch
              onValueChange={toggleWear}
              value={isEnabledWear}
              renderActiveText={false}
              renderInActiveText={false}
              backgroundActive={"#A9DCFF"}
              backgroundInactive={"#D2D2D2"}
              circleActiveColor={"#2687C8"}
              circleInActiveColor={"#7A7A7A"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    height: "100%",
  },
  settingsItems: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 21,
    flexDirection: "row",
    alignItems: "flex-start",

    justifyContent: "space-between",
    borderRadius: 17,
    padding: 10,
  },
  settingsItemsMulti: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 21,

    borderRadius: 17,
    padding: 10,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",

    justifyContent: "space-between",
    marginTop: 21,
  },
  text: {
    fontSize: 16,
    color: "#2687C8",
    marginHorizontal: 5,

    alignSelf: "center",
    fontFamily: "Cairo-Regular",
  },
  textSwitch: {
    fontSize: 12,

    alignSelf: "center",
    fontFamily: "Cairo-Regular",
    color: "white",
  },
});

export default Settings;
