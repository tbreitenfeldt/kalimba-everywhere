import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function GamesScreen() {
  return (
    <View style={styles.container}>
      <Text>Games screen</Text>
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
