import { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
// Components
import { Loading } from './Loading';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Services
import {
  addMatchIdToUserService,
  getMatchesIdsService,
} from '../services/UserService';
// Stores
import { useStore } from '../stores/userStore';

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
  const { t } = useTranslation();
  const username = useStore(state => state.username);
  const { theme } = useTheme();
  const [matchesIDs, setMatchesIDs] = useState<string[]>([]);

  useEffect(() => {
    fetchMatchesIds();
  }, [modalVisible]);

  const fetchMatchesIds = async () => {
    if (!username) {
      Alert.alert(
        t('home-tabs.map.modal.fail'),
        t('home-tabs.map.modal.fail-mess'),
      );
      return;
    }
    await getMatchesIdsService(username)
      .then(res => {
        setMatchesIDs(res ?? []);
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };

  const addIDToMatches = async () => {
    if (!username) {
      Alert.alert(
        t('home-tabs.map.modal.fail'),
        t('home-tabs.map.modal.fail-mess'),
      );
      return;
    }
    await addMatchIdToUserService(username, match._id)
      .then(() => setModalVisible(!modalVisible))
      .catch(err => Alert.alert(t('home-tabs.map.modal.fail') + ': ', err));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          ...styles.centeredView,
          backgroundColor: theme.transparent,
        }}
      >
        <View style={{ ...styles.modalView, backgroundColor: theme.surface }}>
          {username === match.publisher ? (
            <Text style={styles.modalText}>
              {t('home-tabs.map.modal.publisher')}:{' '}
              {t('home-tabs.map.modal.you')}
            </Text>
          ) : (
            <Text style={styles.modalText}>
              {t('home-tabs.map.modal.publisher')}: {match.publisher}
            </Text>
          )}
          <Text style={styles.modalText}>
            {t('home-tabs.map.modal.day')}: {match.day}
          </Text>
          <Text style={styles.modalText}>
            {t('home-tabs.map.modal.time')}: {match.time}
          </Text>
          {matchesIDs ? (
            <>
              {matchesIDs.includes(match._id) ? (
                <Text>{t('home-tabs.map.modal.info')}</Text>
              ) : (
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: theme.primary }}
                  onPress={() => addIDToMatches()}
                >
                  <Text style={{ ...styles.textStyle, color: theme.border }}>
                    {t('home-tabs.map.modal.add')}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={{
                  ...styles.button,
                  ...styles.buttonClose,
                  borderColor: theme.primary,
                  backgroundColor: theme.surface,
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{ ...styles.textStyle, color: theme.textPrimary }}>
                  {t('home-tabs.map.modal.close')}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <Loading />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    margin: 20,
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
  },
  buttonClose: {
    borderWidth: 2,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
