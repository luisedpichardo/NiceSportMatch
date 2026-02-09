import { Alert, Platform } from 'react-native';
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import functions from '@react-native-firebase/functions';
// Services
import { getUserRefService } from './UserService';
// Utils
import {
  requestNotificationAndroidPermission,
  requestNotificationIOSPermission,
} from '../utils/PermissionsHelpers';

const functionsInstance = functions();

// Test a function locally before deploying
// if (__DEV__) {
//   const host = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
//   functionsInstance.useEmulator(host, 5001);
// }

export const retrieveDeviceTokenService = async () => {
  const email = getAuth().currentUser?.email;
  let token;
  const isEmulator = await DeviceInfo.isEmulator();

  if (!email) throw new Error('no username found');
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
      addDeviceToken(email, token);
    }
  }
};

export const addDeviceToken = async (email: string, token: string) => {
  try {
    let tokens;
    let newTokens;
    const userTokenRef = firestore().collection('tokens').doc(email);
    const userTokens = (await userTokenRef.get()).data();
    if (userTokens?.deviceTokens) {
      // Add if there are more
      tokens = userTokens.deviceTokens;
      newTokens = [...tokens, token];
      await userTokenRef.update({ deviceTokens: newTokens });
    } else {
      // Create the array of tokens
      newTokens = [token];
      await userTokenRef.set({ deviceTokens: newTokens });
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const removeDeviceToken = async (email: any, token: string) => {
  try {
    const userTokenRef = firestore().collection('tokens').doc(email);
    const userTokens = (await userTokenRef.get()).data();
    if (userTokens?.deviceTokens) {
      // Remove token if there is a list
      const tokens = userTokens.deviceTokens;
      console.log(tokens);
      // Filter through the list
      const newTokens = tokens.filter((item: string) => item !== token);
      console.log('new tokens', newTokens);
      await userTokenRef.update({ deviceTokens: newTokens });
    } else {
      throw new Error('Could not find any tokens');
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const getTokensService = async (email: string) => {
  try {
    console.log(email);
    const tokensRef = firestore().collection('tokens').doc(email);
    const userTokens = (await tokensRef.get()).data();
    console.log(userTokens?.deviceTokens);
    if (userTokens) {
      return userTokens;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const matchAddedNotificationService = async (
  currUsername: string,
  username: string,
) => {
  if (username === currUsername) return;
  console.log('trying to create a notification');
  try {
    const userRef = (await getUserRefService(username).get()).data();
    if (userRef) {
      const userTokens = await getTokensService(userRef.email);
      if (userTokens) {
        const notification = {
          notification: {
            title: 'Someone is interested in your matches!',
            body: 'Get in and add missing informating to your match for the rest.',
          },
          tokens: userTokens.deviceTokens,
        };
        console.log('notification to user: ', notification);
      }
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const newMessageNotificationService = async (newMessage: any) => {
  try {
    const receiverRef = (
      await getUserRefService(newMessage.receiver).get()
    ).data();
    if (receiverRef) {
      const userReceiverTokens = await getTokensService(receiverRef.email);
      if (userReceiverTokens) {
        const notification = {
          notification: {
            title: newMessage.sender,
            body: newMessage.message,
          },
          tokens: userReceiverTokens.deviceTokens,
        };
        console.log('notification to user: ', notification);
      }
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
