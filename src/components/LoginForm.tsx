import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Formik } from 'formik';
// Components
import { SignUpLoginInput } from '../components/SignUpLoginInput';
// Schemas
import { loginValidation } from '../schemas/LoginValidation';

export const LoginForm = () => {
  const onLoginPressed = (email: string, password: string) => {
    console.log('login pressed');
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
              style={{ alignItems: 'flex-end' }}
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
});
