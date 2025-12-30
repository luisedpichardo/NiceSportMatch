import uuid from 'react-native-uuid';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
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
    // Get reference for messages
    const allMessages = (await firestore().collection('messages').get()).docs;
    // Get actual mesages that only involve username and someone
    const actualMessages = allMessages
      .filter(item => {
        return (
          (item.data().sender === username &&
            item.data().receiver === someone) ||
          (item.data().sender === someone && item.data().receiver === username)
        );
      })
      .map(item => item.data());
    return actualMessages;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
