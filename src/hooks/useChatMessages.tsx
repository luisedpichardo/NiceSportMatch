import { useEffect, useState } from 'react';
import firestore, { Filter } from '@react-native-firebase/firestore';

export type ChatMessage = {
  id: string;
  sender: string;
  receiver: string;
  text: string;
  time: any;
};

export const useChatMessages = (username?: string, someone?: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username || !someone) {
      setMessages([]);
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
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
      .orderBy('time', 'asc')
      .onSnapshot(
        snapshot => {
          if (!snapshot) return;

          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as ChatMessage[];

          setMessages(data);
          setLoading(false);
        },
        error => {
          console.error('useChatMessages error:', error);
          setLoading(false);
        },
      );

    return unsubscribe;
  }, [username, someone]);

  return { messages, loading };
};
