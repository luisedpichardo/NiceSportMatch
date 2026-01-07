import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// Hooks
import { useInternet } from './useInternet';
// Services
import { readPastMatchesFromDBService } from '../services/LocalDBService';
// Utils
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';

export const usePastMatches = () => {
  const [pastMatches, setPastMatches] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { internetAccess } = useInternet();

  useEffect(() => {
    setLoading(true);

    if (!internetAccess) {
      setLoading(true);
      fetchForNoInternet();
      return;
    }

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

          setPastMatches(data);
          setLoading(false);
        },
        error => {
          setLoading(false);
          Alert.alert('Error', error.message);
        },
      );
    return () => unsub();
  }, [internetAccess]);

  const fetchForNoInternet = async () => {
    const pastMatches: any = await readPastMatchesFromDBService();
    // set pastMatches;
    const actualPast = pastMatches.filter(
      (item: any) => dateFormatHelper(item.day) === 'Past',
    );
    setPastMatches(actualPast);
    setLoading(false);
  };

  return { pastMatches, loading };
};
