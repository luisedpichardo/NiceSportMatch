import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
// Components
import { CustomInput } from './CustomInput';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Schemas
import { signUpValidation } from '../schemas/SignUpValidation';
// Services
import { createUserWithEmailAndPasswordService } from '../services/AuthService';
import { analyticsService, types } from '../services/AnalyticsService';
import { crashService, onSignUpService } from '../services/CrashlyticsService';

export const SignUpForm = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

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
        analyticsService(types.BUTTON, 'User successfully signed up');
        onSignUpService({ firstName, lastName, username, email });
        Alert.alert(t('auth.sign-up.sign-up-form.alert-success'));
      })
      .catch((err: any) => {
        crashService(err);
        Alert.alert(t('auth.sign-up.sign-up-form.alert-fail'), err.message);
      });
  };

  return (
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
      {({ handleChange, handleSubmit, values, errors, isValid }) => (
        <>
          <CustomInput
            title={t('auth.sign-up.sign-up-form.first-name')}
            placeholder={t('auth.sign-up.sign-up-form.first-name')}
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            secureTextEntry={false}
            keyboardType="default"
            error={errors}
            errorMessage={errors.firstName}
          />
          <CustomInput
            title={t('auth.sign-up.sign-up-form.last-name')}
            placeholder={t('auth.sign-up.sign-up-form.last-name')}
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            secureTextEntry={false}
            keyboardType="default"
            error={errors}
            errorMessage={errors.lastName}
          />
          <CustomInput
            title={t('auth.sign-up.sign-up-form.username')}
            placeholder={t('auth.sign-up.sign-up-form.username')}
            value={values.username}
            onChangeText={handleChange('username')}
            secureTextEntry={false}
            keyboardType="default"
            error={errors}
            errorMessage={errors.username}
          />
          <CustomInput
            title={t('auth.sign-up.sign-up-form.email')}
            placeholder={t('auth.sign-up.sign-up-form.email')}
            value={values.email}
            onChangeText={handleChange('email')}
            secureTextEntry={false}
            keyboardType="email-address"
            error={errors}
            errorMessage={errors.email}
          />
          <CustomInput
            title={t('auth.sign-up.sign-up-form.password')}
            placeholder={t('auth.sign-up.sign-up-form.password')}
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry={true}
            keyboardType="default"
            error={errors}
            errorMessage={errors.password}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.btn, { backgroundColor: theme.primary }]}
            disabled={!isValid}
          >
            <Text style={{ color: theme.surface, fontSize: 20 }}>
              {t('auth.sign-up.sign-up-form.sign-up')}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
