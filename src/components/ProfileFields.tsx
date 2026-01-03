import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
// Services
import {
  getUserRefService,
  readFieldsToUpdateUserService,
} from '../services/UserService';
import { analyticsService, types } from '../services/AnalyticsService';
// Stores
import { useUserStore } from '../stores/userStore';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

export const ProfileFields = () => {
  const { t } = useTranslation();
  const username = useUserStore(state => state.username);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [firstName, setFirstName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [age, setAge] = useState('');
  const [newAge, setNewAge] = useState('');

  useEffect(() => {
    if (!username) return;
    readFieldsToUpdateUserService(username).then(res => {
      setFirstName(res.firstName ?? '');
      setLastName(res.lastName ?? '');
      if (res.age) setAge(res.age);
    });
  }, [username]);

  const updateAccount = async () => {
    if (username) {
      // Get reference for user
      const userRef: any = getUserRefService(username);
      // Assign data accordingly
      const updatedData: any = {};
      if (newFirstName) updatedData.firstName = newFirstName;
      if (newLastName) updatedData.lastName = newLastName;
      if (newAge) updatedData.age = newAge;
      // Check that the update is not empty
      if (Object.keys(updatedData).length === 0) {
        Alert.alert(t('settings.profile.info.no-change'));
        return;
      }
      // Send the update
      try {
        await userRef.update(updatedData);
        analyticsService(types.BUTTON, 'User updates profile information');
        Alert.alert(
          t('settings.profile.info.alert-success'),
          t('settings.profile.info.alert-suc-mess'),
        );
      } catch (err: any) {
        Alert.alert(t('settings.profile.info.alert-fail'), err.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Text style={[styles.txt, { color: theme.primary }]}>
        {t('settings.profile.info.first-name')}
      </Text>
      <TextInput
        placeholder={firstName}
        value={newFirstName}
        onChangeText={setNewFirstName}
        style={[styles.input, { borderColor: theme.primary }]}
      />
      <Text style={[styles.txt, { color: theme.primary }]}>
        {t('settings.profile.info.last-name')}
      </Text>
      <TextInput
        placeholder={lastName}
        value={newLastName}
        onChangeText={setNewLastName}
        style={[styles.input, { borderColor: theme.primary }]}
      />
      <Text style={[styles.txt, { color: theme.primary }]}>
        {t('settings.profile.info.age')}
      </Text>
      <TextInput
        placeholder={age}
        value={newAge}
        onChangeText={setNewAge}
        keyboardType="numeric"
        style={[styles.input, { borderColor: theme.primary }]}
      />

      <TouchableOpacity
        onPress={updateAccount}
        style={[styles.btnStyle, { backgroundColor: theme.surface }]}
      >
        <Text style={{ fontWeight: 'bold' }}>
          {t('settings.profile.info.update')}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 3,
    padding: 10,
    marginVertical: 5,
  },
  btnStyle: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt: {
    fontWeight: 'bold',
  },
});
