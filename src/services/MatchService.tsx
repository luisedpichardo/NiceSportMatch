import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { addMatchIdToUserService } from './UserService';

export const createMatchService = async (
  address: string,
  day: string,
  time: string,
  publisher: any,
) => {
  try {
    const match = {
      _id: uuid.v4(),
      address,
      day,
      time,
      publisher,
    };
    console.log(match);

    await firestore().collection('matches').doc(match._id).set(match);
    // Add id to array of matches inside user
    addMatchIdToUserService(publisher, match._id)

  } catch (e: any) {
    throw new Error(e.message);
  }
};
