import React from 'react';
import {Settings, StyleSheet, View, Text, Switch} from 'react-native';

import Header from '../components/Header';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {kalimbaSettings: null};
    this.setSpeakNotesSetting = this.setSpeakNotesSetting.bind(this);
    this.setShowNoteLabelsSetting = this.setShowNoteLabelsSetting.bind(this);
    this.setNumberOfKeysSetting = this.setNumberOfKeysSetting.bind(this);
  }

  setSpeakNotesSetting() {
    const newConfiguration = !this.state.kalimbaSettings.shouldSpeakNotes;
    Settings.set({shouldSpeakNotes: newConfiguration});
    this.setState({kalimbaSettings: {shouldSpeakNotes: newConfiguration}});
  }

  setShowNoteLabelsSetting() {
    const newConfiguration = !this.state.kalimbaSettings.shouldShowNoteLabels;
    Settings.set({shouldShowNoteLabels: newConfiguration});
    this.setState({kalimbaSettings: {shouldShowNoteLabels: newConfiguration}});
  }

  setNumberOfKeysSetting() {
    const newConfiguration = !this.state.kalimbaSettings.numberOfKeys;
    Settings.set({numberOfKeys: newConfiguration});
    this.setState({kalimbaSettings: {numberOfKeys: newConfiguration}});
  }

  componentDidMount() {
    this.setState({
      kalimbaSettings: {
        shouldSpeakNotes: Settings.get('shouldSpeakNotes') || false,
        shouldShowNoteLabels: Settings.get('shouldShowNoteLabels') || true,
        numberOfKeys: Settings.get('numberOfKeys') || 10,
      },
    });
  }

  render() {
    if (!this.state.kalimbaSettings) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Header title="Settings" />

        <View style={styles.setting}>
          <Text accessible={false}>
            Speak Notes if screen reader is enabled
          </Text>
          <Switch
            accessibilityLabel={'Speak Notes if screen reader is enabled'}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor="#f5dd4b"
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.setSpeakNotesSetting}
            value={this.state.kalimbaSettings.shouldSpeakNotes}
          />
        </View>

        <View style={styles.setting}>
          <Text accessible={false}>Show note labels</Text>
          <Switch
            accessibilityLabel={'Show Note Labels'}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor="#f5dd4b"
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.setShowNoteLabelsSetting}
            value={this.state.kalimbaSettings.shouldShowNoteLabels}
          />
        </View>
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
  setting: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
