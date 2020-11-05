import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Button,
} from 'react-native';

import Kalimba from '../components/Kalimba';
import SettingsManager from '../utils/settingsManager';

export default class KalimbaScreen extends React.Component {
  constructor(props) {
    super(props);
    this.hasPlayed = false;
    this.onChange = this.onChange.bind(this);
    this.state = {
      landscape: this.isLandscape(),
      kalimbaSettings: null,
    };
  }

  isLandscape() {
    const dimensions = Dimensions.get('screen');
    return dimensions.width >= dimensions.height;
  }

  onChange() {
    if (this.isLandscape()) {
      this.hasPlayed = true;
    } else if (this.hasPlayed && !this.isLandscape()) {
      this.props.navigation.navigate('Free Play');
    }

    const mode = this.isLandscape();
    this.setState({landscape: mode});
  }

  componentDidMount() {
    if (this.isLandscape()) {
      this.hasPlayed = true;
    }

    Dimensions.addEventListener('change', this.onChange);

    const data = {
      shouldSpeakNotes: SettingsManager.get('shouldSpeakNotes'),
      shouldShowNoteLabels: SettingsManager.get('shouldShowNoteLabels'),
      numberOfKeys: SettingsManager.get('numberOfKeys'),
    };
    this.setState({kalimbaSettings: data});
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
    StatusBar.setHidden(false);
  }

  render() {
    if (!this.state.landscape) {
      return (
        <View style={styles.container}>
          <Text>
            To start playing, turn your phone to enter landscape mode. Turn your
            phone back to portret to go back to the previous screen.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {this.state.kalimbaSettings && (
          <Kalimba {...this.state.kalimbaSettings} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
