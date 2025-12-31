import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { readAllMatchesService } from '../services/MatchService';

export const useAllMatches = () => {
  const [matches, setMatches] = useState<any>();

  // Focus Effect to Read Matches everytime the map focuses
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchMatches = async () => {
        try {
          const res = await readAllMatchesService();
          if (isActive) {
            setMatches(res);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchMatches();
      return () => {
        isActive = false;
      };
    }, []),
  );

  return { matches };
};
