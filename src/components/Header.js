import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Text h1 accessibilityRole="header">
        {props.title}
      </Text>
    </View>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
