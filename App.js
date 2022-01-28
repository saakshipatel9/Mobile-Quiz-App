import { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import { Login } from "./Screens/Login";
import { Home } from "./Screens/Home";
import { About } from "./Screens/About";
import { Profile } from "./Screens/Profile";
import { Quiz } from "./Screens/Quiz";
import { Dictionary } from "./Screens/Dictionary";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const fetchFonts = () => {
  return Font.loadAsync({
    "ropasans-regular": require("./assets/fonts/RopaSans-Regular.ttf"),
    // "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    // "roboto-italic": require("./assets/fonts/Roboto-Italic.ttf"),
    // "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [dataLoad, setDataLoad] = useState(false);
  const [user, setUser] = useState(null);

  if (!dataLoad) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoad(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && (
          <Stack.Group
            screenOptions={{ presentation: "modal", headerShown: false }}
          >
            <Stack.Screen name="login" component={Login} />
          </Stack.Group>
        )}

        {user && (
          <Stack.Group>
            <Stack.Screen
              name="root"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="quiz" component={Quiz} />
            <Stack.Screen name="dictionary" component={Dictionary} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFABAB",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="dictonary"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bookmark" color={color} size={40} />
          ),
        }}
      />

      <Tab.Screen
        name="about"
        component={About}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="info" color={color} size={40} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
