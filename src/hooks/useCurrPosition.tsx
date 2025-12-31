import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
// Helpers
import { requestLocationPermission } from '../utils/PermissionsHelpers';

export const useCurrPosition = () => {
  const [currPosition, setCurrPosition] = useState({ lat: 0, long: 0 });

  // Set to load current positon
  useEffect(() => {
    let watchId: number;
    const start = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;
      // If accepted now get Location
      watchId = watchLocation();
    };
    start();
    // Unsubscribe
    return () => {
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Watch current position
  const watchLocation = () => {
    //Initial position
    Geolocation.getCurrentPosition(
      pos => {
        setCurrPosition({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
      },
      err => Alert.alert('initial error', err.message),
      { enableHighAccuracy: true },
    );

    return Geolocation.watchPosition(
      async (data: any) => {
        setCurrPosition({
          lat: data.coords.latitude,
          long: data.coords.longitude,
        });
      },
      (err: any) => {
        Alert.alert(err.message);
      },
    );
  };

  return { currPosition };
};
