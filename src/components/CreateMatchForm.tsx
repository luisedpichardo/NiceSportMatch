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
import PickDate, { DatePickerRef } from './PickDate';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Schemas
import { matchValidation } from '../schemas/MatchValidation';
// Services
import { createMatchService } from '../services/MatchService';
// Stores
import { userStore } from '../stores/userStore';

type Props = {
  navigation: any;
};

export const CreateMatchForm = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const { theme } = useTheme();
  const [validating, setValidating] = useState(false);
  const mapRef = useRef<MapLocationPickerRef>(null);
  const dateRef = useRef<DatePickerRef>(null);

  const onCreateMatch = async (time: string) => {
    setValidating(true);

    const location = mapRef.current?.getLocation();
    if (!location) {
      Alert.alert(t('home-tabs.match-stack.create.create-form.select-loc'));
      setValidating(false);
      return;
    }
    const date = dateRef.current?.getDate();
    console.log(date);
    if (!date) {
      Alert.alert('Missing date');
      setValidating(false);
      return;
    }

    try {
      createMatchService(
        location.latitude,
        location.longitude,
        date,
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

      <PickDate ref={dateRef} />

      <View style={styles.formStyle}>
        <Formik
          validationSchema={matchValidation}
          initialValues={{
            time: '',
          }}
          onSubmit={values => onCreateMatch(values.time)}
        >
          {({ handleChange, handleSubmit, values, errors, isValid }) => (
            <>
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
