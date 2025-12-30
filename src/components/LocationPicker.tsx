import React, { forwardRef, useImperativeHandle, useState } from 'react';
import MapView, { Marker, MapPressEvent } from 'react-native-maps';

export type MapLocationPickerRef = {
  getLocation: () => any;
  clearLocation: () => void;
};

export const LocationPicker = forwardRef<MapLocationPickerRef, {}>(
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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress} // or onLongPress
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
