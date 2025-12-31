import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
// Stores
import { useUserStore } from '../stores/userStore';

export const useGetMatchesIds = () => {
  const username = useUserStore(state => state.username);
  const [matchesIds, setMatchesIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(username)
      .onSnapshot(doc => {
        const ids = doc.data()?.matchesIds ?? [];
        console.log('ids:', ids);
        setMatchesIds(ids);

        setLoading(false);
      });

    return unsubscribe;
  }, [username]);

  return { matchesIds, loading };
};
