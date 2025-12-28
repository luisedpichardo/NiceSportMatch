import { forwardRef, useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

export type MapLocationUpdaterRef = {
  getLocation: () => any;
  clearLocation: () => void;
};

type Props = {
  initialLoc: any;
};

export const LocationUpdater = forwardRef<MapLocationUpdaterRef, Props>(
  (props, ref) => {
    const [location, setLocation] = useState<{
      latitude: number;
      longitude: number;
    } | null>(null);

    const handleMapPress = (event: MapPressEvent) => {
      const { latitude, longitude } = event.nativeEvent.coordinate;
      setLocation({ latitude, longitude });
    };

    useImperativeHandle(ref, () => ({
      getLocation: () => location,
      clearLocation: () => setLocation(null),
    }));

    return (
      <>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: props.initialLoc.lat,
            longitude: props.initialLoc.long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleMapPress} // or onLongPress
        >
          <Marker
            key={0}
            title="Current Location"
            coordinate={{
              latitude: props.initialLoc.lat,
              longitude: props.initialLoc.long,
            }}
            pinColor="green"
          />
          {location && (
            <Marker
              key={1}
              title="New Location"
              coordinate={location}
              draggable
              onDragEnd={e => setLocation(e.nativeEvent.coordinate)}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={{ marginVertical: 5 }}
          onPress={() => setLocation(null)}
        >
          <Text style={styles.btn}>Remove New Marker</Text>
        </TouchableOpacity>
      </>
    );
  },
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
});
