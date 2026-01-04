import firestore from '@react-native-firebase/firestore';
// Sercices
import { matchAddedNotificationService } from './TokenNotifService';

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
    ).data()?.profileImage;
    return imgUri;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const addMatchIdToUserService = async (
  currUsername: string,
  username: string,
  _id: string,
) => {
  try {
    const userRef = getUserRefService(currUsername);
    const user = (await userRef.get()).data();
    if (user) {
      if (user.matchesIds) {
        const matchesIds = [...user.matchesIds, _id];
        await userRef.update({ matchesIds });
      } else {
        await userRef.update({ matchesIds: [_id] });
      }
      matchAddedNotificationService(currUsername, username);
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

export const removeMatchFromUserService = async (
  _id: string,
  username: string,
) => {
  try {
    await firestore()
      .collection('users')
      .doc(username)
      .get()
      .then(async userData => {
        if (!userData.data()) {
          throw new Error('Could not get data');
        }
        const matchesIds = userData.data()?.matchesIds;
        const newIds = matchesIds.filter((elem: any) => elem !== _id);
        // Update ids in firebase
        await getUserRefService(username).update({ matchesIds: newIds });
      })
      .catch(err => {
        throw new Error(err.message);
      });
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const addReferenceForUserChatService = async (
  username: string,
  usernameToAdd: string,
) => {
  try {
    const userRef = getUserRefService(username);
    const user = (await userRef.get()).data();
    if (user) {
      if (user.chatsRef) {
        if (user.chatsRef.includes(usernameToAdd)) return;
        const chatsRef = [...user.chatsRef, usernameToAdd];
        await userRef.update({ chatsRef });
      } else {
        await userRef.update({ chatsRef: [usernameToAdd] });
      }
    } else {
      throw new Error('No user found');
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getChatsForUsersService = async (username: string) => {
  try {
    const userRef = getUserRefService(username);
    const user = (await userRef.get()).data();
    if (user?.chatsRef) {
      return user.chatsRef;
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};
