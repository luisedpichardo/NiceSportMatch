import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore, { Filter } from '@react-native-firebase/firestore';
// Stores
import { useStore } from '../stores/userStore';

export const useChatMessages = (someone: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const username = useStore(state => state.username);

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
          }));
          setMessages(data);
          setLoading(false);
        },
        e => {
          Alert.alert(e.message);
          setLoading(false);
        },
      );

    return unsubscribe;
  }, [username, someone]);

  return { messages, loading };
};
