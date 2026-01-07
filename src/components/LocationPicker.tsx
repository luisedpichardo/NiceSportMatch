import React, { forwardRef, useImperativeHandle, useState } from 'react';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';
import { useCurrPosition } from '../hooks/useCurrPosition';

export type MapLocationPickerRef = {
  getLocation: () => any;
  clearLocation: () => void;
};

export const LocationPicker = forwardRef<MapLocationPickerRef, {}>(
  (props, ref) => {
    const { currPosition } = useCurrPosition();
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
      <MapView
        testID="container"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currPosition.lat,
          longitude: currPosition.long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
        showsUserLocation={true}
      >
        {location && (
          <Marker
            coordinate={location}
            draggable
            onDragEnd={e => setLocation(e.nativeEvent.coordinate)}
          />
        )}
      </MapView>
    );
  },
);
