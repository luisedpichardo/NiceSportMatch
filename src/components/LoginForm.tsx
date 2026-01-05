import { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
// Components
import { CustomInput } from './CustomInput';
import { Loading } from './Loading';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Schemas
import { loginValidation } from '../schemas/LoginValidation';
// Services
import { signInWithEmailAndPasswordService } from '../services/AuthService';
import { analyticsService, types } from '../services/AnalyticsService';
import { crashService, onLogInService } from '../services/CrashlyticsService';

export const LoginForm = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  const onLoginPressed = (email: string, password: string) => {
    signInWithEmailAndPasswordService(email, password)
      .then(() => {
        analyticsService(types.BUTTON, 'User successfully logged in');
        onLogInService({ email });
        setLoading(false);
        Alert.alert(t('auth.log-in.login-form.alert-succes'));
      })
      .catch(err => {
        crashService(err);
        Alert.alert(t('auth.log-in.login-form.alert-fail'), err.message);
        signOut(getAuth());
      });
  };

  return (
    <Formik
      validationSchema={loginValidation}
      style={{ flex: 3 }}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => {
        setLoading(true);
        onLoginPressed(values.email, values.password);
      }}
    >
      {({ handleChange, handleSubmit, values, errors, isValid }) => (
        <>
          <CustomInput
            title={t('auth.log-in.login-form.email')}
            placeholder={t('auth.log-in.login-form.email')}
            value={values.email}
            onChangeText={handleChange('email')}
            secureTextEntry={false}
            keyboardType="email-address"
            error={errors}
            errorMessage={errors.email}
          />
          <CustomInput
            title={t('auth.log-in.login-form.password')}
            placeholder={t('auth.log-in.login-form.password')}
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
            {loading ? (
              <Loading />
            ) : (
              <Text style={{ color: theme.surface, fontSize: 20 }}>
                {t('auth.log-in.login-form.log-in')}
              </Text>
            )}
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
