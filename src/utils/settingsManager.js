import {Settings} from 'react-native';

const defaultSettings = {
  shouldShowNoteLabels: true,
  shouldSpeakNotes: false,
  numberOfKeys: 10,
};

export default class SettingsManager {
  static get(key) {
    if (defaultSettings[key] == undefined) {
      throw new Error(
        "The key '" +
          key +
          "' is invalid. Please refer to the default settings object for valid keys.",
      );
    }

    const value = Settings.get(key);

    if (value === undefined) {
      return defaultSettings[key];
    }
    if (typeof defaultSettings[key] === 'boolean') {
      return Boolean(value);
    }

    return value;
  }

  static set(key, value) {
    if (defaultSettings[key] == undefined) {
      throw new Error(
        "The key '" +
          key +
          "' is invalid. Please refer to the default settings object for valid keys.",
      );
    }

    const data = {};
    data[key] = value;
    Settings.set(data);
  }
}
