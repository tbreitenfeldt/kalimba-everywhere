import React from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Header from '../components/Header';
import SettingsManager from '../utils/settingsManager';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {kalimbaSettings: null};
    this.kalimbaKeys = ['8', '10'];
    this.setSpeakNotesSetting = this.setSpeakNotesSetting.bind(this);
    this.setShowNoteLabelsSetting = this.setShowNoteLabelsSetting.bind(this);
    this.setNumberOfKeysSetting = this.setNumberOfKeysSetting.bind(this);
    this.setShowOctiveNumbersSetting = this.setShowOctiveNumbersSetting.bind(
      this,
    );
  }

  setSpeakNotesSetting(event) {
    const value = !this.state.kalimbaSettings.shouldSpeakNotes;
    const data = {...this.state.kalimbaSettings, shouldSpeakNotes: value};
    SettingsManager.set('shouldSpeakNotes', value);
    this.setState({kalimbaSettings: data});
  }

  setShowNoteLabelsSetting(event) {
    const value = !this.state.kalimbaSettings.shouldShowNoteLabels;
    const data = {...this.state.kalimbaSettings, shouldShowNoteLabels: value};
    SettingsManager.set('shouldShowNoteLabels', value);
    this.setState({kalimbaSettings: data});
  }

  setNumberOfKeysSetting(itemValue, itemIndex) {
    const value = parseInt(itemValue, 10);
    const data = {...this.state.kalimbaSettings, numberOfKeys: value};
    SettingsManager.set('numberOfKeys', value);
    this.setState({kalimbaSettings: data});
  }

  setShowOctiveNumbersSetting(event) {
    const value = !this.state.kalimbaSettings.showOctiveNumbers;
    const data = {...this.state.kalimbaSettings, showOctiveNumbers: value};
    SettingsManager.set('showOctiveNumbers', value);
    this.setState({kalimbaSettings: data});
  }

  componentDidMount() {
    const data = {
      shouldSpeakNotes: SettingsManager.get('shouldSpeakNotes'),
      shouldShowNoteLabels: SettingsManager.get('shouldShowNoteLabels'),
      numberOfKeys: SettingsManager.get('numberOfKeys'),
      showOctiveNumbers: SettingsManager.get('showOctiveNumbers'),
    };
    this.setState({kalimbaSettings: data});
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

        <View style={styles.setting}>
          <Text>Number of Kalimba Keys</Text>
          <Picker
            selectedValue={this.state.kalimbaSettings.numberOfKeys.toString()}
            style={{height: 50, width: 100}}
            onValueChange={this.setNumberOfKeysSetting}>
            {this.kalimbaKeys.map((value, index) => {
              return <Picker.Item label={value} value={value} key={value} />;
            })}
          </Picker>
        </View>

        <View style={styles.setting}>
          <Text accessible={false}>Show octive numbers</Text>
          <Switch
            accessibilityLabel={'Show octive numbers'}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor="#f5dd4b"
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.setShowOctiveNumbersSetting}
            value={this.state.kalimbaSettings.showOctiveNumbers}
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
