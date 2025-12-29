import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
// Services
import {
  addMatchIdToUserService,
  getMatchesIdsService,
} from '../services/UserService';
// Stores
import { useUserStore } from '../stores/userStore';

type MatchDetailsModalProps = {
  modalVisible: any;
  setModalVisible: any;
  match: any;
};

export const MatchDetailsModal = ({
  modalVisible,
  setModalVisible,
  match,
}: MatchDetailsModalProps) => {
  const username = useUserStore(state => state.username);
  const [matchesIDs, setMatchesIDs] = useState<string[]>([]);

  useEffect(() => {
    fetchMatchesIds();
  }, []);

  const fetchMatchesIds = async () => {
    if (!username) {
      Alert.alert('Error', 'Could not find username');
      return;
    }
    await getMatchesIdsService(username)
      .then(res => {
        console.log(res);
        setMatchesIDs(res);
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };

  const addIDToMatches = async () => {
    if (!username) {
      Alert.alert('Error', 'Could not get username.');
      return;
    }
    await addMatchIdToUserService(username, match._id).catch(err =>
      console.log('error: ', err),
    );
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {username === match.publisher ? (
              <Text style={styles.modalText}>Publisher: You</Text>
            ) : (
              <Text style={styles.modalText}>Publisher: {match.publisher}</Text>
            )}
            <Text style={styles.modalText}>Day: {match.day}</Text>
            <Text style={styles.modalText}>Time: {match.time}</Text>
            <>
              {matchesIDs.includes(match._id) ? (
                <Text>Modify or Remove under list of Matches</Text>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => addIDToMatches()}
                >
                  <Text style={styles.textStyle}>Add to my matches</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ ...styles.textStyle, color: 'black' }}>
                  Close Info
                </Text>
              </TouchableOpacity>
            </>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    elevation: 2,
    marginVertical: 5,
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
