import { addEventListener } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

export const useInternet = () => {
  const [internetAccess, setInternetAccess] = useState(false);

  useEffect(() => {
    // Subscribe
    const unsubscribe = addEventListener((state: any) => {
      const online = state.isInternetReachable ?? state.isConnected;
      setInternetAccess(!!online);
    });
    // Unsubscribe
    return () => unsubscribe();
  });

  return { internetAccess };
};
