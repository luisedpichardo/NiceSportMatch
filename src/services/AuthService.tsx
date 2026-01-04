import { Alert, Image, Platform } from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
// Services
import { addDeviceToken, removeDeviceToken } from './TokenNotifService';
// Utils
import {
  requestNotificationAndroidPermission,
  requestNotificationIOSPermission,
} from '../utils/PermissionsHelpers';

export const createUserWithEmailAndPasswordService = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    // Use lowercase for username
    const lowUsername = username.toLowerCase();
    // Check if the username is valid
    const invalidUsername = (
      await firestore().collection('users').doc(lowUsername).get()
    ).exists();
    // If username in use
    if (invalidUsername) throw new Error('Username must be unique');
    // Assing default picture and compress it
    const imageUri = Image.resolveAssetSource(
      require('../../assets/account_pp_default.jpg'),
    ).uri;
    // Create user with email and password
    await createUserWithEmailAndPassword(getAuth(), email, password);
    // Save user info into firestore
    await firestore().collection('users').doc(lowUsername).set({
      email,
      username: lowUsername,
      firstName,
      lastName,
      imageUri,
    });
    signOut(getAuth());
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('That email address is invalid!');
    } else {
      throw new Error(error.message ?? String(error));
    }
  }
};

export const signInWithEmailAndPasswordService = async (
  email: string,
  password: string,
) => {
  // Set context
  try {
    let token;
    console.log('before sign up');
    // Log in
    await signInWithEmailAndPassword(getAuth(), email, password);
    console.log('before deailing with the token');
    const isEmulator = await DeviceInfo.isEmulator();
    if (isEmulator) {
      Alert.alert(
        'You are not on real device so notifications will not work on you',
      );
    } else {
      // Create token for push notifications
      if (Platform.OS === 'ios') {
        token = await requestNotificationIOSPermission();
      } else if (Platform.OS === 'android') {
        token = await requestNotificationAndroidPermission();
      }
      if (token) {
        console.log(token);
        addDeviceToken(email, token);
      }
    }
  } catch (e: any) {
    if (e.code === 'auth/invalid-credential') {
      throw new Error('This does not match our records!');
    } else if (e.code === 'auth/network-request-failed') {
      throw new Error('Seems that there is no internet, try again later!');
    } else {
      throw new Error(e.message ?? String(e));
    }
  }
};

// Sign out User
export const signOutService = async () => {
  const email = getAuth().currentUser?.email;
  // Remove device token for the notificatinos
  const isEmulator = await DeviceInfo.isEmulator();

  if (isEmulator) {
    Alert.alert('Thanks for trying our app using an emulator!');
  } else {
    let token;
    // Create token for push notifications
    if (Platform.OS === 'ios') {
      token = await requestNotificationIOSPermission();
    } else if (Platform.OS === 'android') {
      token = await requestNotificationAndroidPermission();
    }
    if (token) removeDeviceToken(email, token);
  }
  signOut(getAuth());
};

// Read users
export const readUsersService = async () => {
  try {
    const users = (await firestore().collection('users').get()).docs;
    return users;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
