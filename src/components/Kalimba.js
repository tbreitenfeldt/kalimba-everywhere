import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TapGestureHandler, State } from "react-native-gesture-handler";

export default class Kalimba extends React.Component {
  onSingleTap(event) {
    if (event.nativeEvent.state === State.BEGAN) {
      alert("I'm touched");
    }
  }

  render() {
    return (
      <TapGestureHandler onSingleTap={this.onSingleTap.bind(this)}>
        <View>
          <Text>Touch me</Text>
        </View>
      </TapGestureHandler>
    );
  }
}
