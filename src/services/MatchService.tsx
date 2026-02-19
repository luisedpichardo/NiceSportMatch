import uuid from 'react-native-uuid';
import { getApp } from '@react-native-firebase/app';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from '@react-native-firebase/firestore';
// Services
import { addMatchIdToUserService, getMatchesIdsService } from './UserService';
import {
  createMatchForDBService,
  updateMatchForDBService,
} from '../services/LocalDBService';

const app = getApp();
const db = getFirestore(app);

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
      createdAt: new Date(),
    };
    // Update local db
    createMatchForDBService(match);
    // Add to firestore
    const matchDocRef = doc(db, 'matches', match._id);
    await setDoc(matchDocRef, match);

    // Add id to array of matches inside user
    addMatchIdToUserService(publisher, publisher, match._id);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const readAllMatchesService = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'matches'));
    const matches = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
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
    // Update on local DB
    updateMatchForDBService(match);
    await getMatchRefService(match._id).update(match);
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getMatchRefService = (_id: string) => {
  try {
    return doc(collection(db, 'matches'), _id);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
