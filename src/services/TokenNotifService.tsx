import firestore from '@react-native-firebase/firestore';

export const addDeviceToken = async (email: string, token: string) => {
  try {
    let tokens;
    let newTokens;
    const userTokenRef = firestore().collection('tokens').doc(email);
    const userTokens = (await userTokenRef.get()).data();
    if (userTokens?.deviceTokens) {
      // Add if there are more
      tokens = userTokens.data().deviceTokens;
      newTokens = [...tokens, token];
      await userTokens.update({ deviceTokens: newTokens });
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
      const tokens = userTokens.data().deviceTokens;
      // Filter through the list
      const newTokens = tokens.filter((item: any) => item !== token);
      await userTokens.update({ deviceTokens: newTokens });
    } else {
      throw new Error('Could not find any tokens');
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
