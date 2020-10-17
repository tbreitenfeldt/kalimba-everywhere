import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
