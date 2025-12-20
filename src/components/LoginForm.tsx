import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import { getAuth, signOut } from '@react-native-firebase/auth';
// Components
import { SignUpLoginInput } from '../components/SignUpLoginInput';
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
            <SignUpLoginInput
              title="Email"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              secureTextEntry={false}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorSty}>{errors.email}</Text>
            )}
            <SignUpLoginInput
              title="Password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry={true}
              keyboardType="default"
            />
            {errors.password && (
              <Text style={styles.errorSty}>{errors.password}</Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.btn}
              disabled={!isValid}
            >
              <Text>Log In</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  errorSty: { fontSize: 10, color: 'red' },
  btn: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
});
