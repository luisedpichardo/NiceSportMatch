import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// Services
import {
  getUserRefService,
  readFieldsToUpdateUserService,
} from '../services/UserService';
// Stores
import { useUserStore } from '../stores/userStore';

export const ProfileFields = () => {
  // Get current username
  const username = useUserStore(state => state.username);
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
        Alert.alert('Nothing to update');
        return;
      }
      // Send the update
      try {
        await userRef.update(updatedData);
        Alert.alert('Success', 'Account info updated!');
      } catch (err: any) {
        Alert.alert('Failed to update account info.', err.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Text style={styles.txt}>First Name</Text>
      <TextInput
        placeholder={firstName}
        value={newFirstName}
        onChangeText={setNewFirstName}
        style={styles.input}
      />
      <Text style={styles.txt}>Last Name</Text>
      <TextInput
        placeholder={lastName}
        value={newLastName}
        onChangeText={setNewLastName}
        style={styles.input}
      />
      <Text style={styles.txt}>Age</Text>
      <TextInput
        placeholder={age}
        value={newAge}
        onChangeText={setNewAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={updateAccount} style={styles.btnStyle}>
        <Text style={{ fontWeight: 'bold' }}>Update account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 3,
    borderColor: 'green',
    padding: 10,
    marginVertical: 5,
  },
  btnStyle: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt: {
    color: 'green',
    fontWeight: 'bold',
  },
});
