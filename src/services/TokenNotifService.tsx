import firestore from '@react-native-firebase/firestore';
// Services
import { getUserRefService } from './UserService';

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
