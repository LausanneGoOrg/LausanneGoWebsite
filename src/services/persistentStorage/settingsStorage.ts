import AsyncStorage from "@react-native-async-storage/async-storage";
import { Storage } from "../persistentStorage/storage.type";

const storeConfidentialitySettings = async (value: {
  accessPosition: boolean;
  personalizedVisits: boolean;
}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("confidentiality-settings", jsonValue);
  } catch (e) {
    // saving error
    console.error("Error saving confidentiality settings:", e);
  }
};

const getConfidentialitySettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("confidentiality-settings");
    return jsonValue != null
      ? (JSON.parse(jsonValue) as Storage["settings"]["confidentiality"])
      : {
          accessPosition: false,
          personalizedVisits: false,
        };
  } catch (e) {
    // error reading value
    console.error("Error reading confidentiality settings:", e);
    return {
      accessPosition: false,
      personalizedVisits: false,
    };
  }
};

const storeNotificationSettings = async (value: {
  pushNotifications: boolean;
  challengeNotifications: boolean;
  eventNotifications: boolean;
  promotionsNotifications: boolean;
}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("notification-settings", jsonValue);
  } catch (e) {
    // saving error
    console.error("Error saving notification settings:", e);
  }
};

const getNotificationSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("notification-settings");
    return jsonValue != null
      ? (JSON.parse(jsonValue) as Storage["settings"]["notification"])
      : {
          pushNotifications: false,
          challengeNotifications: false,
          eventNotifications: false,
          promotionsNotifications: false,
        };
  } catch (e) {
    // error reading value
    console.error("Error reading notification settings:", e);
    return {
      pushNotifications: false,
      challengeNotifications: false,
      eventNotifications: false,
      promotionsNotifications: false,
    };
  }
};

export {
  storeConfidentialitySettings,
  getConfidentialitySettings,
  storeNotificationSettings,
  getNotificationSettings,
};
