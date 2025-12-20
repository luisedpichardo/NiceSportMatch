import { Alert, StyleSheet, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
// Types
import { NavHomeTab, NavRoot } from '../navigation/types';
import { useUserStore } from '../stores/userStore';
import { Loading } from '../components/Loading';

type Props = CompositeScreenProps<
  BottomTabScreenProps<NavHomeTab, 'Map'>,
  NativeStackScreenProps<NavRoot>
>;

export const Main = ({ navigation }: Props) => {
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
    const watchID = Geolocation.watchPosition(
      async (data: any) => {
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
    <View style={styles.container}>
      {loading ? <Loading /> : <Text style={styles.txt}>Map</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'white',
    fontSize: 20,
  },
});
