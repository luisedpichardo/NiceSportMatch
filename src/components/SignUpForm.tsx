import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
// Components
import { SignUpLoginInput } from '../components/SignUpLoginInput';
// Schemas
import { signUpValidation } from '../schemas/SignUpValidation';

export const SignUpForm = () => {
  const onSignUpPressed = (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    console.log('SignUp pressed');
  };

  return (
    <View>
      <Formik
        validationSchema={signUpValidation}
        style={{ flex: 3 }}
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        onSubmit={values => {
          onSignUpPressed(
            values.firstName,
            values.lastName,
            values.email,
            values.password,
          );
        }}
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <>
            <SignUpLoginInput
              title="First Name"
              placeholder="First Name"
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              secureTextEntry={false}
              keyboardType="default"
            />
            {errors.email && (
              <Text style={styles.errorSty}>{errors.email}</Text>
            )}
            <SignUpLoginInput
              title="Last Name"
              placeholder="Last Name"
              value={values.lastName}
              onChangeText={handleChange('lastName')}
              secureTextEntry={false}
              keyboardType="default"
            />
            {errors.email && (
              <Text style={styles.errorSty}>{errors.email}</Text>
            )}
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
              style={{ alignItems: 'flex-end' }}
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
  errorSty: { fontSize: 10, color: 'red' },
});
