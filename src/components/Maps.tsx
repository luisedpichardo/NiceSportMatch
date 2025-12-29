import { Alert, Platform, Text } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, {
  Callout,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
// Components
import { MatchDetailsModal } from './MatchDetailsModal';
// Services
import { readAllMatchesService } from '../services/MatchService';
// Utils
import { requestLocationPermission } from '../utils/PermissionsHelpers';

type Props = {
  matches: Array<any>;
};

export const Maps = () => {
  const [currPosition, setCurrPosition] = useState({ lat: 0, long: 0 });
  const mapRef = useRef<MapView | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matches, setMatches] = useState<Array<any>>([]);

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
      err => console.log('initial error', err),
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

  return (
    <>
      {selectedMatch && (
        <MatchDetailsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          match={selectedMatch}
        />
      )}
      <MapView
        ref={mapRef}
        showsUserLocation={true}
        provider={
          Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        style={{ flex: 1 }}
        region={{
          latitude: currPosition.lat,
          longitude: currPosition.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {matches.map(elem => {
          return (
            <Marker
              key={elem._id}
              coordinate={{
                latitude: elem.address.lat,
                longitude: elem.address.long,
              }}
            >
              <Callout
                onPress={() => {
                  setSelectedMatch(elem);
                  setModalVisible(true);
                }}
              >
                <Text>Click Me For Details</Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </>
  );
};
