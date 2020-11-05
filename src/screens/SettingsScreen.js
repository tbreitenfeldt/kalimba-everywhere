import React from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';

import Header from '../components/Header';
import SettingsManager from '../utils/settingsManager';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setSpeakNotesSetting = this.setSpeakNotesSetting.bind(this);
    this.setShowNoteLabelsSetting = this.setShowNoteLabelsSetting.bind(this);
    this.setNumberOfKeysSetting = this.setNumberOfKeysSetting.bind(this);
  }

  setSpeakNotesSetting(event) {
    const value = !this.state.shouldSpeakNotes;
    SettingsManager.set('shouldSpeakNotes', value);
    this.setState({shouldSpeakNotes: value});
  }

  setShowNoteLabelsSetting(event) {
    const value = !this.state.shouldShowNoteLabels;
    SettingsManager.set('shouldShowNoteLabels', value);
    this.setState({shouldShowNoteLabels: value});
  }

  setNumberOfKeysSetting(event) {
    const value = event;
    SettingsManager.set('numberOfKeys', value);
    this.setState({numberOfKeys: value});
  }

  componentDidMount() {
    this.setState({
      shouldSpeakNotes: SettingsManager.get('shouldSpeakNotes'),
      shouldShowNoteLabels: SettingsManager.get('shouldShowNoteLabels'),
      numberOfKeys: SettingsManager.get('numberOfKeys'),
    });
  }

  render() {
    if (!this.state) {
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
            value={this.state.shouldSpeakNotes}
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
            value={this.state.shouldShowNoteLabels}
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
