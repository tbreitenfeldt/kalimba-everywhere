import React from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

export default function Header(props) {
  return (
    <View>
      <Text h1 accessibilityRole="header">
        {props.title}
      </Text>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
