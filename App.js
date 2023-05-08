import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { unloadAsync, useFonts } from "expo-font";
import Home from "./screens/home";
import Article from "./screens/article";
import Wear from "./screens/wear";
import Favorite from "./screens/favorite";
import Menu from "./screens/menu";
import Link from "./screens/link";
import Settings from "./screens/settings";
import { QueryClient, QueryClientProvider } from "react-query";

import { useState, useEffect, useRef } from "react";

import OneSignal from "react-native-onesignal";
import * as SecureStore from "expo-secure-store";
import SplashScreen from "./screens/splash";

import Context from "./Context/Context";
import ContextWrapper from "./Context/ContextWrapper";

const Stack = createStackNavigator();

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

const queryClient = new QueryClient();
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setShowSplash(false);
    }, 2000);
  }, []);
  useEffect(() => {
    // OneSignal Initialization
    OneSignal.setAppId("2ed574c4-230f-4bff-b284-492e2dcae330");

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      async (notificationReceivedEvent) => {
        console.log(
          "OneSignal: notification will show in foreground:",
          notificationReceivedEvent
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log("notification: ", notification);
        const data = notification.additionalData;
        console.log("additionalData: ", data.type);
        // Complete with null means don't show a notification.
        if (data) {
          const type = await getValueFor(data.type);
          console.log(typeof type);
          if (type == "true") {
            notificationReceivedEvent.complete(notification);
          } else {
            notificationReceivedEvent.complete(null);
          }
        }
      }
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log("OneSignal: notification opened:", notification);
    });

    return () => {
      OneSignal.clearHandlers();
    };
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  } else {
    return (
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <ContextWrapper>
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  animationEnabled: false,
                  headerShown: false,
                  title: "الرئيسية",
                }}
                name="Home"
                component={Home}
              />
              <Stack.Screen
                options={{
                  animationEnabled: false,
                  headerShown: false,
                  title: "الاعدادات",
                }}
                name="Settings"
                component={Settings}
              />
              <Stack.Screen
                options={{
                  animationEnabled: false,
                  headerShown: false,
                  title: "القائمة",
                }}
                name="Menu"
                component={Menu}
              />
              <Stack.Screen
                options={{
                  animationEnabled: false,
                  headerShown: false,
                  title: "الروابط",
                }}
                name="Link"
                component={Link}
              />
              <Stack.Screen
                options={{
                  animationEnabled: false,
                  headerShown: false,
                  title: "شو نلبس بكرى",
                }}
                name="Wear"
                component={Wear}
              />
              <Stack.Screen
                options={{
                  animationEnabled: false,
                  headerShown: false,
                  title: "المقالات",
                }}
                name="Article"
                component={Article}
              />
              <Stack.Screen
                options={{
                  animationEnabled: false,
                  headerShown: false,
                  title: "المفضلة",
                }}
                name="Favorite"
                component={Favorite}
              />
            </Stack.Navigator>
          </ContextWrapper>
        </QueryClientProvider>
      </NavigationContainer>
    );
  }
}
