import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import { getAuth, signOut } from '@react-native-firebase/auth';
// Components
import { CustomInput } from './CustomInput';
// Schemas
import { loginValidation } from '../schemas/LoginValidation';
// Services
import { signInWithEmailAndPasswordService } from '../services/AuthService';

export const LoginForm = () => {
  const onLoginPressed = (email: string, password: string) => {
    signInWithEmailAndPasswordService(email, password)
      .then(() => Alert.alert('Welcome'))
      .catch(err => {
        Alert.alert('Error', err.message);
        signOut(getAuth());
      });
  };

  return (
    <View>
      <Formik
        validationSchema={loginValidation}
        style={{ flex: 3 }}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => {
          onLoginPressed(values.email, values.password);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <>
            <CustomInput
              title="Email"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              secureTextEntry={false}
              keyboardType="email-address"
              error={errors}
              errorMessage={errors.email}
            />
            <CustomInput
              title="Password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
              keyboardType="default"
              error={errors}
              errorMessage={errors.password}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btn}
              disabled={!isValid}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'green',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
