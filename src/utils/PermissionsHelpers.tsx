import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requestLocationPermission = async () => {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  ]);

  return (
    granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
      PermissionsAndroid.RESULTS.GRANTED &&
    granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
      PermissionsAndroid.RESULTS.GRANTED
  );
};

export const requestNotificationIOSPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return requestDeviceToken();
    }
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message);
  }
};

export const requestNotificationAndroidPermission = async () => {
  try {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return requestDeviceToken();
    } else {
      throw new Error('Denied');
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const requestDeviceToken = async () => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
    return token;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
