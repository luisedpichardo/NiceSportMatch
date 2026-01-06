import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Utils
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';

export const usePastMatches = () => {
  const [pastMatches, setPastMatches] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsub = firestore()
      .collection('matches')
      .onSnapshot(
        snapshot => {
          const data =
            snapshot?.docs
              .map(doc => ({
                id: doc.id,
                ...doc.data(),
              }))
              .filter((item: any) => dateFormatHelper(item.day) === 'Past') ??
            [];

          console.log(data);

          setPastMatches(data);
          setLoading(false);
        },
        error => {
          setLoading(false);
          Alert.alert('Error', error.message);
        },
      );
    return () => unsub();
  }, []);

  return { pastMatches, loading };
};
