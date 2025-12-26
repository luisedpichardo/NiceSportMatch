import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// Stores
import { useUserStore } from '../stores/userStore';
// Types
import { NavHomeTab, NavRoot } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<NavHomeTab, 'Map'>,
  NativeStackScreenProps<NavRoot>
>;

export const Maps = ({ navigation }: Props) => {
  const user = useUserStore(state => state.user);
  const [currPosition, setCurrPosition] = useState({ lat: 0, long: 0 });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView | null>(null);

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
    console.log('getting lat');

    //Initial position
    Geolocation.getCurrentPosition(
      pos => {
        console.log('initial position', pos);
        setCurrPosition({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
      },
      err => console.log('initial error', err),
      { enableHighAccuracy: true },
    );

    return Geolocation.watchPosition(
      data => {
        console.log('data', data);

        setCurrPosition({
          lat: data.coords.latitude,
          long: data.coords.longitude,
        });

        setLoading(false);
      },
      error => {
        console.log('location error', error);
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );
  };
  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);

    return (
      granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  };

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={{
        latitude: currPosition.lat || 33.749,
        longitude: currPosition.long || -84.3877,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  );
};
