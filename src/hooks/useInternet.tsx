import { addEventListener } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export const useInternet = () => {
  const [internetAccess, setInternetAccess] = useState(true);

  useEffect(() => {
    // Subscribe
    const unsubscribe = addEventListener((state: any) => {
      console.log(state);
      console.log('internet?', state.isConnected);
      console.log('reachable?', state.isInternetReachable);
      const online = state.isInternetReachable ?? state.isConnected;
      console.log('online', online);
      setInternetAccess(!!online);
    });
    // Unsubscribe
    return () => unsubscribe();
  });

  return { internetAccess };
};
