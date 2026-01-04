import uuid from 'react-native-uuid';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
// Services
import { addReferenceForUserChatService } from './UserService';
import { newMessageNotificationService } from './TokenNotifService';

export const sendMessageService = async (
  sender: string,
  receiver: string,
  message: string,
) => {
  try {
    const unique = uuid.v4();
    const newMessage = {
      _id: unique,
      sender,
      receiver,
      message,
      time: serverTimestamp(),
    };
    await firestore().collection('messages').doc(unique).set(newMessage);
    // Add reference on each user that chat exists
    addReferenceForUserChatService(sender, receiver);
    addReferenceForUserChatService(receiver, sender);
    // Send notification
    newMessageNotificationService(newMessage);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
