import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Formik } from 'formik';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
// Components
import { CustomInput } from './CustomInput';
// Schemas
import { loginValidation } from '../schemas/LoginValidation';
// Services
import { signInWithEmailAndPasswordService } from '../services/AuthService';

export const LoginForm = () => {
  const {t} =useTranslation()
  const onLoginPressed = (email: string, password: string) => {
    signInWithEmailAndPasswordService(email, password)
      .then(() => Alert.alert(t('auth.log-in.login-form.alert-succes')))
      .catch(err => {
        Alert.alert(t('auth.log-in.login-form.alert-fail'), err.message);
        signOut(getAuth());
      });
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
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
                style={styles.btn}
                disabled={!isValid}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>{t('auth.log-in.login-form.log-in')}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
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
