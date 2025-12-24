import { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
    // Find respective fields for username
    if (username) {
      readFieldsToUpdateUserService(username).then(res => {
        setFirstName(res.firstName);
        setLastName(res.lastName);
        if (res.age) setAge(res.age);
      });
    } else {
      throw new Error('Could not get username');
    }
  });

  const updateAccount = async () => {
    if (username) {
      // Get reference for user
      const userRef: any = getUserRefService(username);
      // Assign data accordingly
      const updatedData: any = {};
      if (newFirstName) updatedData.firstName = newFirstName;
      if (newLastName) updatedData.lastName = newLastName;
      if (newAge) updatedData.age = newAge;
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
    <View style={styles.fields}>
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

      <TouchableOpacity onPress={updateAccount}>
        <Text style={styles.btnStyle}>Update account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fields: {
    justifyContent: 'center',
  },
  input: {
    borderWidth: 3,
    borderColor: 'lightgreen',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
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
    color: 'white',
    marginVertical: 5,
  },
});
