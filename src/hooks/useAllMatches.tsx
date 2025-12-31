import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const useAllMatches = () => {
  const [matches, setMatches] = useState<any>();

  useEffect(() => {
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
        },
        error => {
          Alert.alert('Error', error.message);
        },
      );
    return () => unsub();
  }, []);

  return { matches };
};
