import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_REGISTERED: '@user_registered',
  USER_SESSION: '@user_session',
  BOOKINGS: '@bookings_data',
};

export const saveRegisteredUser = async (user) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_REGISTERED, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving registered user', e);
  }
};

export const getRegisteredUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.USER_REGISTERED);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting registered user', e);
    return null;
  }
};

export const updateUserData = async (updatedFields) => {
  try {
    const current = await getRegisteredUser();
    if (!current) return;
    const updated = { ...current, ...updatedFields };
    await saveRegisteredUser(updated);
    await saveUser(updated);
    return updated;
  } catch (e) {
    console.error('Error updating user data', e);
  }
};

export const deleteAccount = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER_REGISTERED);
    await AsyncStorage.removeItem(KEYS.USER_SESSION);
    await AsyncStorage.removeItem(KEYS.BOOKINGS);
  } catch (e) {
    console.error('Error deleting account', e);
  }
};

export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_SESSION, JSON.stringify(user));
  } catch (e) {
    console.error('Error saving user session', e);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.USER_SESSION);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting user session', e);
    return null;
  }
};

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER_SESSION);
  } catch (e) {
    console.error('Error clearing user', e);
  }
};

export const saveBooking = async (newBooking) => {
  try {
    const existing = await getBookings();
    const updated = [newBooking, ...existing];
    await AsyncStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving booking', e);
  }
};

export const getBookings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.BOOKINGS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting bookings', e);
    return [];
  }
};