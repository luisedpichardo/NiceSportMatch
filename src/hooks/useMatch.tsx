import { useEffect, useState } from 'react';
// Services
import { readMatchById } from '../services/MatchService';

export const useMatch = (id: string) => {
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatch();
  }, []);

  const fetchMatch = () => {
    setLoading(true);
    readMatchById(id)
      .then(res => {
        setMatch(res);
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { match, loading };
};
