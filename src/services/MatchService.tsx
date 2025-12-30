import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
// Services
import { addMatchIdToUserService, getMatchesIdsService } from './UserService';

export const createMatchService = async (
  lat: number,
  long: number,
  day: string,
  time: string,
  publisher: any,
) => {
  try {
    const match = {
      _id: uuid.v4(),
      address: {
        lat,
        long,
      },
      day,
      time,
      publisher,
      status: 'Upcoming',
    };

    await firestore().collection('matches').doc(match._id).set(match);
    // Add id to array of matches inside user
    addMatchIdToUserService(publisher, match._id);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const readAllMatchesService = async () => {
  try {
    const matchesData = (await firestore().collection('matches').get()).docs;
    const matches = matchesData.map(elem => elem.data());
    return matches;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const readOwnUsersMatchesService = async (username: string) => {
  try {
    const matchesIds = await getMatchesIdsService(username);
    const allMatches = await readAllMatchesService();
    const userMatches = allMatches.filter(elem => {
      if (matchesIds.includes(elem._id)) return elem;
    });
    return userMatches;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const updateMatchService = async (match: any) => {
  try {
    await getMatchRefService(match._id).update(match);
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getMatchRefService = (_id: string) => {
  try {
    return firestore().collection('matches').doc(_id);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
