import firestore from '@react-native-firebase/firestore';

export const readFieldsToUpdateUserService = async (username: string) => {
  try {
    const payload = await firestore()
      .collection('users')
      .doc(username)
      .get()
      .then((userData: any) => {
        if (userData.data().age) {
          return {
            firstName: userData.data().firstName,
            lastName: userData.data().lastName,
            age: userData.data().age,
          };
        }
        return {
          firstName: userData.data().firstName,
          lastName: userData.data().lastName,
        };
      });
    return payload;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getUserRefService = (username: string) => {
  try {
    return firestore().collection('users').doc(username);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const readImageUriService = async (username: string) => {
  try {
    const imgUri = (
      await firestore().collection('users').doc(username).get()
    ).data()?.imageUri;
    return imgUri;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
