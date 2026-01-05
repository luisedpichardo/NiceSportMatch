import { useEffect, useState, useRef } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// Helpers
import { requestLocationPermission } from '../utils/PermissionsHelpers';

export const useCurrPosition = () => {
  const [currPosition, setCurrPosition] = useState({ lat: 0, long: 0 });

  // Use a ref to track the watchId so it's accessible across the async boundary
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const startTracking = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission || !isMounted) return;

      // Get initial position once
      Geolocation.getCurrentPosition(
        pos => {
          if (isMounted) {
            setCurrPosition({
              lat: pos.coords.latitude,
              long: pos.coords.longitude,
            });
          }
        },
        err => console.warn('Initial Position Error:', err.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );

      // Start watching with optimization filters
      watchIdRef.current = Geolocation.watchPosition(
        data => {
          if (isMounted) {
            setCurrPosition({
              lat: data.coords.latitude,
              long: data.coords.longitude,
            });
          }
        },
        err => Alert.alert('Location Error', err.message),
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
        },
      );
    };

    startTracking();

    return () => {
      isMounted = false;
      if (watchIdRef.current !== null) {
        Geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { currPosition };
};
