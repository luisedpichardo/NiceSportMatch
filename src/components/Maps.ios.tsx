import { Alert } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
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
    const watchId = watchLocation();
    return () => Geolocation.clearWatch(watchId);
  }, []);

  // Watch current position
  const watchLocation = () => {
    console.log('getting lat');
    const watchID = Geolocation.watchPosition(
      async (data: any) => {
        console.log('data', data);
        // const loc: Location = {
        const loc: any = {
          lat: data.coords.latitude,
          long: data.coords.longitude,
          email: user.email,
          timestamp: data.timestamp,
        };
        setCurrPosition({
          lat: data.coords.latitude,
          long: data.coords.longitude,
        });
        console.log(loc);
        // await setMyLocationService(loc);
        setLoading(false);
      },
      (err: any) => {
        Alert.alert(err.message);
      },
    );
    return watchID;
  };
  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      region={{
        latitude: 33.749,
        longitude: -84.3877,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    />
  );
};
