import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
// Components
import { LocationPicker, MapLocationPickerRef } from './LocationPicker';
import DatePicker, { DatePickerRef } from './DatePicker';
import TimePicker, { TimePickerRef } from './TimePicker';
// Hooks
import { useTheme } from '../hooks/useTheme';
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
  const timeRef = useRef<TimePickerRef>(null);

  const onCreateMatch = async () => {
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
    const time = timeRef.current?.getTime();
    console.log(time);
    if (!time) {
      Alert.alert('Missing time');
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
    <View style={styles.container}>
      <LocationPicker ref={mapRef} />
      <DatePicker ref={dateRef} />
      <TimePicker ref={timeRef} />

      <Pressable
        style={{ ...styles.btn, backgroundColor: theme.primary }}
        onPress={() => onCreateMatch()}
      >
        <Text style={{ ...styles.btnTxt, color: theme.border }}>
          {validating
            ? t('home-tabs.match-stack.create.create-form.validating')
            : t('home-tabs.match-stack.create.create-form.create')}
        </Text>
      </Pressable>
    </View>
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
