import { useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
// Components
import { LocationUpdater, MapLocationUpdaterRef } from './LocationUpdater';
import DateUpdater, { DateUpdaterRef } from './DateUpdater';
import TimeUpdater, { TimeUpdaterRef } from './TimeUpdater';
// Hooks
import { useTheme } from '../hooks/useTheme';
import { updateMatchService } from '../services/MatchService';

type Props = {
  match: any;
  navigation: any;
};

export const UpdateMatchForm = ({ match, navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [newStatus, setNewStatus] = useState('');
  const mapRef = useRef<MapLocationUpdaterRef>(null);
  const dateRef = useRef<DateUpdaterRef>(null);
  const timeRef = useRef<TimeUpdaterRef>(null);

  const onUpdateMatch = async () => {
    // Assign data accordingly
    const updatedData: any = {
      _id: match._id,
    };
    if (mapRef.current?.getLocation()) {
      updatedData.address = {
        lat: mapRef.current.getLocation().latitude,
        long: mapRef.current.getLocation().longitude,
      };
    }
    if (dateRef.current?.getDate()) updatedData.day = dateRef.current.getDate();
    if (timeRef.current?.getTime())
      updatedData.time = timeRef.current.getTime();
    if (newStatus) updatedData.status = newStatus;
    // Send the update
    await updateMatchService(updatedData)
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert(t('home-tabs.match-stack.update.form.fail'), err);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LocationUpdater ref={mapRef} initialLoc={match.address} />

      <DateUpdater ref={dateRef} currDate={match.day} />

      <TimeUpdater ref={timeRef} currTime={match.time} />

      <ScrollView>
        <Text style={[styles.txt, { color: theme.primary }]}>
          {t('home-tabs.match-stack.update.form.status')}
        </Text>
        <TextInput
          placeholder={match.status}
          value={newStatus}
          onChangeText={setNewStatus}
          style={[styles.input, { borderColor: theme.primary }]}
        />
        <TouchableOpacity
          onPress={() => onUpdateMatch()}
          style={[styles.btn, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.btnTxt, { color: theme.border }]}>
            {t('home-tabs.match-stack.update.form.update-info')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  txt: {
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 3,
    padding: 10,
    marginVertical: 5,
  },
});
