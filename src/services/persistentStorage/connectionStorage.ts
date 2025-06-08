import AsyncStorage from "@react-native-async-storage/async-storage";

const storeSkippedConnection = async () => {
  try {
    await AsyncStorage.setItem("skippedConnection", "true");
  } catch (e) {
    // saving error
    console.error("Error saving confidentiality settings:", e);
  }
};

const getSkippedConnection = async () => {
  try {
    const value = await AsyncStorage.getItem("skippedConnection");
    return value != null ? value === "true" : false;
  } catch (e) {
    // error reading value
    console.error("Error reading confidentiality settings:", e);
    return false;
  }
};

const storeFirstConnection = async () => {
  try {
    await AsyncStorage.setItem("firstConnection", "true");
  } catch (e) {
    // saving error
    console.error("Error saving confidentiality settings:", e);
  }
};

const getFirstConnection = async () => {
  try {
    const value = await AsyncStorage.getItem("firstConnection");
    return value != null ? value === "true" : true;
  } catch (e) {
    // error reading value
    console.error("Error reading confidentiality settings:", e);
    return true;
  }
};

export {
  storeSkippedConnection,
  getSkippedConnection,
  storeFirstConnection,
  getFirstConnection,
};
