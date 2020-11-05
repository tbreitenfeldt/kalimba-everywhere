import React from 'react';
import {
  AccessibilityInfo,
  requireNativeComponent,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Sound from 'react-native-sound';

const DirectTouchView = requireNativeComponent('DirectTouchView');

export default class Kalimba extends React.Component {
  static propTypes = {
    numberOfKeys: PropTypes.number,
    shouldSpeakNotes: PropTypes.bool,
    shouldShowNoteLabels: PropTypes.bool,
    showOctiveNumbers: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {activeNote: ''};
    this.kalimbaKeys = [];
    this.sounds = {};
    this.playNote = this.playNote.bind(this);
    this.stopPlayingNote = this.stopPlayingNote.bind(this);

    if (this.props.numberOfKeys === 10) {
      this.kalimbaKeys = [
        'e5',
        'c5',
        'a5',
        'f4',
        'd4',
        'c4',
        'e4',
        'g4',
        'b5',
        'd5',
      ];
    } else if (this.props.numberOfKeys === 8) {
      this.kalimbaKeys = ['c5', 'a5', 'f4', 'd4', 'c4', 'e4', 'g4', 'b5'];
    } else {
      throw Error('Does not support that number of keys.');
    }

    this.kalimbaKeys.forEach((note) => {
      this.sounds[note] = new Sound(
        'audio/' + note + '.wav',
        Sound.MAIN_BUNDLE,
        (error) => {
          if (error) {
            console.log('failed to load the sound.', error);
          }
        },
      );
    });
  }

  playNote(note) {
    if (this.props.shouldSpeakNotes) {
      AccessibilityInfo.isScreenReaderEnabled().then((value) => {
        if (value) {
          AccessibilityInfo.announceForAccessibility(
            this.props.showOctiveNumbers ? note : this.stripOctiveNumber(note),
          );
        }
      });
    }

    this.setState({activeNote: note});
    setTimeout(() => {
      this.sounds[note].play();
    }, 1);
  }

  stopPlayingNote(note) {
    this.setState({activeNote: ''});
    setTimeout(() => {
      // gradually decrease the volume
      for (let i = 0; i < 2000; i++) {
        this.sounds[note].setVolume(1.0 - i / 2000);
      }
      this.sounds[note].stop();
      this.sounds[note].setVolume(1.0);
    }, 1);
  }

  stripOctiveNumber(note) {
    return note.replace(/\d+$/, '');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {this.props.shouldShowNoteLabels && (
            <View style={styles.row}>
              {this.kalimbaKeys.map((note, index) => {
                return (
                  <View style={styles.keyLabel} key={note + 'Label'}>
                    <Text>
                      {this.props.showOctiveNumbers
                        ? note
                        : this.stripOctiveNumber(note)}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}

          <DirectTouchView>
            <View style={styles.row}>
              {this.kalimbaKeys.map((note, index) => {
                return (
                  <View
                    onTouchStart={() => this.playNote(note)}
                    onTouchCancel={() => this.stopPlayingNote(note)}
                    onTouchEnd={() => this.stopPlayingNote(note)}
                    key={note + 'Note'}
                    style={styles.kalimbaKey}></View>
                );
              })}
            </View>
          </DirectTouchView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 150,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  keyLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    borderLeftWidth: 1,
    marginBottom: 30,
  },
  kalimbaKey: {
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 65,
    borderLeftWidth: 1,
  },
});
