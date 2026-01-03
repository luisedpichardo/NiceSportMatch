import { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
// Components
import { CustomInput } from './CustomInput';
import { LocationPicker, MapLocationPickerRef } from './LocationPicker';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Schemas
import { matchValidation } from '../schemas/MatchValidation';
// Services
import { createMatchService } from '../services/MatchService';
// Stores
import { useStore } from '../stores/userStore';

type Props = {
  navigation: any;
};

export const CreateMatchForm = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const username = useStore(state => state.username);
  const { theme } = useTheme();
  const [validating, setValidating] = useState(false);
  const mapRef = useRef<MapLocationPickerRef>(null);

  const onCreateMatch = async (day: string, time: string) => {
    setValidating(true);

    const location = mapRef.current?.getLocation();
    if (!location) {
      Alert.alert(t('home-tabs.match-stack.create.create-form.select-loc'));
      setValidating(false);
      return;
    }

    try {
      createMatchService(
        location.latitude,
        location.longitude,
        day,
        time,
        username,
      );
      setValidating(false);
      Alert.alert(
        t('home-tabs.match-stack.create.create-form.success'),
        t('home-tabs.match-stack.create.create-form.success-mess'),
      );
      navigation.goBack();
    } catch (e: any) {
      Alert.alert(t('home-tabs.match-stack.create.create-form.fail'), e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LocationPicker ref={mapRef} />

      <View style={styles.formStyle}>
        <Formik
          validationSchema={matchValidation}
          initialValues={{
            day: '',
            time: '',
          }}
          onSubmit={values => onCreateMatch(values.day, values.time)}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <>
              <CustomInput
                title={t('home-tabs.match-stack.create.create-form.day')}
                placeholder={t('home-tabs.match-stack.create.create-form.day')}
                value={values.day}
                onChangeText={handleChange('day')}
                secureTextEntry={false}
                keyboardType="default"
                error={errors}
                errorMessage={errors.day}
              />
              <CustomInput
                title={t('home-tabs.match-stack.create.create-form.time')}
                placeholder={t('home-tabs.match-stack.create.create-form.time')}
                value={values.time}
                onChangeText={handleChange('time')}
                secureTextEntry={false}
                keyboardType="default"
                error={errors}
                errorMessage={errors.time}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.btn, { backgroundColor: theme.primary }]}
                disabled={!isValid}
              >
                <Text style={[styles.btnTxt, { color: theme.border }]}>
                  {validating
                    ? t('home-tabs.match-stack.create.create-form.validating')
                    : t('home-tabs.match-stack.create.create-form.create')}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'flex-end',
  },
  btnTxt: {
    fontWeight: 'bold',
  },
  formStyle: {
    marginTop: 20,
  },
});
