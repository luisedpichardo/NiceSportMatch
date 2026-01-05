import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const useAllMatches = () => {
  const [matches, setMatches] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = firestore()
      .collection('matches')
      .onSnapshot(
        snapshot => {
          const data =
            snapshot?.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) ?? [];

          setMatches(data);
          setLoading(false);
        },
        error => {
          Alert.alert('Error', error.message);
        },
      );
    return () => unsub();
  }, []);

  return { matches, loading };
};
