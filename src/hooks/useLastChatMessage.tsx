import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore, { Filter } from '@react-native-firebase/firestore';
// Stores
import { useUserStore } from '../stores/userStore';

export const useLastChatMessages = (someone: string) => {
  const [lastMessage, setLastMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const username = useUserStore(state => state.username);

  useEffect(() => {
    if (!username || !someone) {
      setLastMessages([]);
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
      .limit(1)
      .onSnapshot(
        snapshot => {
          if (!snapshot) return;

          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('data',data)
          setLastMessages(data[0]);
          setLoading(false);
        },
        e => {
          Alert.alert(e.message);
          setLoading(false);
        },
      );

    return unsubscribe;
  }, [username, someone]);

  return { lastMessage, loading };
};
