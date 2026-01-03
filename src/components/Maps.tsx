import { useRef, useState } from 'react';
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
import { useStore } from '../stores/userStore';

export const Maps = () => {
  const { t } = useTranslation();
  const username = useStore(state => state.username);
  const mapRef = useRef<MapView | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { matches } = useAllMatches();
  const { currPosition } = useCurrPosition();

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
        {matches && username ? (
          <>
            {matches.map((elem: any) => {
              return (
                <Marker
                  key={elem._id}
                  coordinate={{
                    latitude: elem.address.lat,
                    longitude: elem.address.long,
                  }}
                  pinColor={elem.publisher === username ? 'green' : 'red'}
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
        ) : (
          <></>
        )}
      </MapView>
    </>
  );
};
