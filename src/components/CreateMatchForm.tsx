import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
// Components
import { CustomInput } from './CustomInput';
// Schemas
import { matchValidation } from '../schemas/MatchValidation';
// Services
import { createMatchService } from '../services/MatchService';
// Stores
import { useUserStore } from '../stores/userStore';

export const CreateMatchForm = () => {
  const username = useUserStore.getState().username;

  const onCreateMatch = (address: string, day: string, time: string) => {
    createMatchService(address, day, time, username);
  };

  return (
    <View>
      <Formik
        validationSchema={matchValidation}
        style={{ flex: 3 }}
        initialValues={{
          address: '',
          day: '',
          time: '',
        }}
        onSubmit={values => {
          onCreateMatch(values.address, values.day, values.time);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <>
            <CustomInput
              title="Address"
              placeholder="Address"
              value={values.address}
              onChangeText={handleChange('address')}
              secureTextEntry={false}
              keyboardType="default"
              error={errors}
              errorMessage={errors.address}
            />
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
              <Text>Create Match</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
});
