import React from 'react';
import {StyleSheet, View, Text, Button, StatusBar} from 'react-native';

import Header from '../components/Header';

export default function FreePlayScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Header title="Kalimba Everywhere" />
      <Button
        title="Start Free Play"
        onPress={() => navigation.navigate('Kalimba')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
