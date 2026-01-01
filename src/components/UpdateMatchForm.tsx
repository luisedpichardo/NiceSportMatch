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
// Services
import { updateMatchService } from '../services/MatchService';

type Props = {
  match: any;
  navigation: any;
};

export const UpdateMatchForm = ({ match, navigation }: Props) => {
  const { t } = useTranslation();
  const [newDay, setNewDay] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const mapRef = useRef<MapLocationUpdaterRef>(null);

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
    if (newDay) updatedData.day = newDay;
    if (newTime) updatedData.time = newTime;
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
      <ScrollView>
        <Text style={styles.txt}>
          {t('home-tabs.match-stack.update.form.day')}
        </Text>
        <TextInput
          placeholder={match.day}
          value={newDay}
          onChangeText={setNewDay}
          style={styles.input}
        />
        <Text style={styles.txt}>
          {t('home-tabs.match-stack.update.form.time')}
        </Text>
        <TextInput
          placeholder={match.time}
          value={newTime}
          onChangeText={setNewTime}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.txt}>
          {t('home-tabs.match-stack.update.form.status')}
        </Text>
        <TextInput
          placeholder={match.status}
          value={newStatus}
          onChangeText={setNewStatus}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => onUpdateMatch()} style={styles.btn}>
          <Text style={styles.btnTxt}>
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
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'flex-end',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
  txt: {
    color: 'green',
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 3,
    borderColor: 'green',
    padding: 10,
    marginVertical: 5,
  },
});
