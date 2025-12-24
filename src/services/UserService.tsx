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

export const addMatchIdToUserService = async (
  username: string,
  _id: string,
) => {
  try {
    const userRef = getUserRefService(username);
    const user = (await userRef.get()).data();
    if (user) {
      if (user.matchesIds) {
        const matchesIds = [...user.matchesIds, _id];
        await userRef.update({ matchesIds });
      } else {
        await userRef.update({ matchesIds: [_id] });
      }
    } else {
      throw new Error('No user found');
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getMatchesIdsService = async (username: string) => {
  try {
    const userData: any = (await getUserRefService(username).get()).data();
    return userData.matchesIds;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
