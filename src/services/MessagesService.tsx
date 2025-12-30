import uuid from 'react-native-uuid';
import firestore, {
  Filter,
  serverTimestamp,
} from '@react-native-firebase/firestore';
// Services
import { addReferenceForUserChatService } from './UserService';

export const sendMessageService = async (
  sender: string,
  receiver: string,
  message: string,
) => {
  try {
    console.log(sender, 'to', receiver, '');
    console.log('sending:', message);
    const unique = uuid.v4();
    await firestore().collection('messages').doc(unique).set({
      _id: unique,
      sender,
      receiver,
      message,
      time: serverTimestamp(),
    });

    // Add reference on each user that chat exists
    addReferenceForUserChatService(sender, receiver);
    addReferenceForUserChatService(receiver, sender);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getMessagesForUserChat = async (
  username: string,
  someone: string,
) => {
  try {
    // fetch from firestore
    const snapShot = await firestore()
      .collection('messages')
      .where(
        Filter.or(
          Filter.and(
            Filter('sender', '==', username),
            Filter('receiver', '==', someone),
          ),
          Filter.and(
            Filter('sender', '==', someone),
            Filter('receiver', '==', username),
          ),
        ),
      )
      .get()
      .then(res => {
        return res.docs.map(item => item.data());
      });
    return snapShot;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
