import { Alert, Platform } from 'react-native';
import { getApp } from '@react-native-firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
// Services
import { removeDeviceToken } from './TokenNotifService';
// Utils
import {
  requestNotificationAndroidPermission,
  requestNotificationIOSPermission,
} from '../utils/PermissionsHelpers';

const app = getApp();
const db = getFirestore(app);

export const createUserWithEmailAndPasswordService = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    // Use lowercase
    const lowUsername = username.toLowerCase();
    const lowEmail = email.toLowerCase();
    // Check if the username is valid
    const userDocRef = doc(db, 'users', lowUsername);
    const userSnapshot = await getDoc(userDocRef);
    // If username in use
    if (userSnapshot.exists()) {
      throw new Error('Username must be unique');
    }
    // Create user with email and password
    await createUserWithEmailAndPassword(getAuth(), lowEmail, password);
    // Save user profile to Firestore
    await setDoc(userDocRef, {
      email: lowEmail,
      username: lowUsername,
      firstName,
      lastName,
      imageUri:
        'https://nice-sport-match-bucket.s3.us-east-2.amazonaws.com/profile-pics/account_pp_default.jpg',
      createdAt: new Date(),
    });
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
    // Log in
    await signInWithEmailAndPassword(getAuth(), email, password);
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
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
