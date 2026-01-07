import { useMemo, useRef, useState } from 'react';
import { Platform, Text } from 'react-native';
import MapView, {
  Callout,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useTranslation } from 'react-i18next';
// Components
import { MatchDetailsModal } from './MatchDetailsModal';
// Hooks
import { useAllMatches } from '../hooks/useAllMatches';
import { useCurrPosition } from '../hooks/useCurrPosition';
// Stores
import { userStore } from '../stores/userStore';
// Utils
import { dateFormatHelper } from '../utils/functions/dateFormatHelper';
import { useGetMatchesIds } from '../hooks/useGetMatchesIds';

export const Maps = () => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const mapRef = useRef<MapView | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { matchesIds } = useGetMatchesIds();
  const { matches, loading } = useAllMatches();
  const { currPosition } = useCurrPosition();

  const markers = useMemo(() => {
    if (!matches || !username) return [];
    return matches.map((match: any) => {
      let color = 'red'; // Default color

      if (match.publisher === username) {
        color = 'green'; // If the current user created it
      } else if (matchesIds.includes(match._id)) {
        color = 'blue'; // If the current user has joined it
      }
      return { ...match, markerColor: color };
    });
  }, [matches, username, matchesIds]);

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
        {loading ? (
          <></>
        ) : (
          <>
            {markers.map((elem: any) => {
              if (dateFormatHelper(elem.day) === 'Past') {
                return <></>;
              }
              return (
                <Marker
                  key={elem._id}
                  coordinate={{
                    latitude: elem.address.lat,
                    longitude: elem.address.long,
                  }}
                  pinColor={elem.markerColor}
                >
                  <Callout
                    onPress={() => {
                      setSelectedMatch(elem);
                      setModalVisible(true);
                    }}
                  >
                    <Text>{t('home-tabs.map.details')}</Text>
                  </Callout>
                </Marker>
              );
            })}
          </>
        )}
      </MapView>
    </>
  );
};
