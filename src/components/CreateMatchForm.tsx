import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
// Components
import { CustomInput } from './CustomInput';
import { LocationPicker, MapLocationPickerRef } from './LocationPicker';
// Schemas
import { matchValidation } from '../schemas/MatchValidation';
// Services
import { createMatchService } from '../services/MatchService';
// Stores
import { useUserStore } from '../stores/userStore';

export const CreateMatchForm = () => {
  const username = useUserStore(state => state.username);
  const [validating, setValidating] = useState(false);
  const mapRef = useRef<MapLocationPickerRef>(null);

  const onCreateMatch = async (day: string, time: string) => {
    setValidating(true);

    const location = mapRef.current?.getLocation();
    if (!location) {
      Alert.alert('Please select a location');
      return;
    }
    console.log('Selected location:', location);

    try {
      console.log('checking');
      createMatchService(
        location.latitude,
        location.longitude,
        day,
        time,
        username,
      );
      setValidating(false);
      Alert.alert('Succes', 'Match was created!');
    } catch (e: any) {
      Alert.alert('Error', e);
    }
  };

  return (
    <View style={styles.container}>
      <LocationPicker ref={mapRef} />

      <View style={{ marginTop: 20 }}>
        <Formik
          validationSchema={matchValidation}
          initialValues={{
            day: '',
            time: '',
          }}
          onSubmit={values => {
            console.log(values);
            onCreateMatch(values.day, values.time);
          }}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <>
              <CustomInput
                title="Day"
                placeholder="Day"
                value={values.day}
                onChangeText={handleChange('day')}
                secureTextEntry={false}
                keyboardType="default"
                error={errors}
                errorMessage={errors.day}
              />
              <CustomInput
                title="Time"
                placeholder="Time"
                value={values.time}
                onChangeText={handleChange('time')}
                secureTextEntry={false}
                keyboardType="default"
                error={errors}
                errorMessage={errors.time}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.btn}
                disabled={!isValid}
              >
                <Text style={styles.btnTxt}>
                  {validating ? 'Validating...' : 'Create Match'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'flex-end',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
