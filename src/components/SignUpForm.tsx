import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
// Components
import { CustomInput } from './CustomInput';
// Schemas
import { signUpValidation } from '../schemas/SignUpValidation';
// Services
import { createUserWithEmailAndPasswordService } from '../services/AuthService';

export const SignUpForm = () => {
  const onSignUpPressed = (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ) => {
    createUserWithEmailAndPasswordService(
      firstName,
      lastName,
      username,
      email,
      password,
    )
      .then(() => {
        Alert.alert('Succes');
      })
      .catch((err: any) => {
        Alert.alert('Error', err.message);
      });
  };

  return (
    <View>
      <Formik
        validationSchema={signUpValidation}
        style={{ flex: 3 }}
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
        }}
        onSubmit={values => {
          onSignUpPressed(
            values.firstName,
            values.lastName,
            values.username,
            values.email,
            values.password,
          );
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          isValid,
        }) => (
          <>
            <CustomInput
              title="First Name"
              placeholder="First Name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              secureTextEntry={false}
              keyboardType="default"
              error={errors}
              errorMessage={errors.firstName}
            />
            <CustomInput
              title="Last Name"
              placeholder="Last Name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              secureTextEntry={false}
              keyboardType="default"
              error={errors}
              errorMessage={errors.lastName}
            />
            <CustomInput
              title="Username"
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange('username')}
              secureTextEntry={false}
              keyboardType="default"
              error={errors}
              errorMessage={errors.username}
            />
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
              <Text>Sign Up</Text>
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
