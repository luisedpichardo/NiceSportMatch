import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useState } from 'react';
// Services
import { updateMatchService } from '../services/MatchService';

type Props = {
  match: any;
};

export const UpdateMatchForm = ({ match }: Props) => {
  const [newAddress, setNewAddress] = useState('');
  const [newDay, setNewDay] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const onUpdateMatch = async () => {
    // Assign data accordingly
    const updatedData: any = {
      _id: match._id,
    };
    if (newAddress) updatedData.address = newAddress;
    if (newDay) updatedData.day = newDay;
    if (newTime) updatedData.time = newTime;
    if (newStatus) updatedData.status = newStatus;
    // Send the update
    await updateMatchService(updatedData)
      .then(() => {
        Alert.alert('Success', 'Match info has been updated!');
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  return (
    <View>
      <Text style={styles.txt}>Address</Text>
      <TextInput
        placeholder={match.address}
        value={newAddress}
        onChangeText={setNewAddress}
        style={styles.input}
      />
      <Text style={styles.txt}>Day</Text>
      <TextInput
        placeholder={match.day}
        value={newDay}
        onChangeText={setNewDay}
        style={styles.input}
      />
      <Text style={styles.txt}>Time</Text>
      <TextInput
        placeholder={match.time}
        value={newTime}
        onChangeText={setNewTime}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.txt}>Status</Text>
      <TextInput
        placeholder={match.status}
        value={newStatus}
        onChangeText={setNewStatus}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity onPress={() => onUpdateMatch()}>
        <Text style={styles.btn}>Update Match</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  txt: {
    color: 'white',
    marginVertical: 5,
  },
  input: {
    borderBottomWidth: 3,
    borderColor: 'lightgreen',
    padding: 10,
    marginBottom: 10,
  },
});
