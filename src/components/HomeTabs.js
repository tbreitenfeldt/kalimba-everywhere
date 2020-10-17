import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FreePlayScreen from "../screens/FreePlayScreen";
import GamesScreen from "../screens/GamesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Free Play"
      tabBarOptions={{ activeTintColor: "tomato", inactiveTintColor: "gray" }}
    >
      <Tab.Screen name="Free Play" component={FreePlayScreen} />
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
