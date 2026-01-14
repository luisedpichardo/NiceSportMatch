import uuid from 'react-native-uuid';
import firestore, { serverTimestamp } from '@react-native-firebase/firestore';
// Services
import { addReferenceForUserChatService } from './UserService';
import { newMessageNotificationService } from './TokenNotifService';

type Message = {
  _id: string;
  sender: string;
  receiver: string;
  image?: any;
  message?: string;
  time: any;
};

export const sendMessageService = async (
  sender: string,
  receiver: string,
  message: string,
  flag: string,
  _id: string,
) => {
  try {
    let newMessage: Message;
    let unique = uuid.v4();
    if (flag === 'image') {
      newMessage = {
        _id: _id,
        sender,
        receiver,
        image: message,
        time: serverTimestamp(),
      };
      unique = _id;
    } else {
      newMessage = {
        _id: uuid.v4(),
        sender,
        receiver,
        message,
        time: serverTimestamp(),
      };
    }
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
