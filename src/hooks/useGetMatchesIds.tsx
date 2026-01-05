import { useEffect, useMemo, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
// Stores
import { userStore } from '../stores/userStore';

export const useGetMatchesIds = () => {
  const username = userStore(state => state.username);
  const [matchesIds, setMatchesIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(username)
      .onSnapshot(doc => {
        const ids = doc.data()?.matchesIds ?? [];
        setMatchesIds(ids);
        setLoading(false);
      });

    return unsubscribe;
  }, [username]);
  const memoizedIds = useMemo(() => matchesIds, [JSON.stringify(matchesIds)]);

  return { matchesIds: memoizedIds, loading };
};
