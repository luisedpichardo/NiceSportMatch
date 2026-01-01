import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  modalVisible: any;
  setModalVisible: any;
  someone: string;
  navigation: any;
};

export const RedirectModal = ({
  modalVisible,
  setModalVisible,
  someone,
  navigation,
}: Props) => {
  const { t } = useTranslation();
  const onRedirectToChat = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Chat', { someone });
  };

  const cancelChat = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 25 }}>
            {t('home-tabs.messages-stack.messages.modal.continue')} {someone}?
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => cancelChat()}
            >
              <Text style={{ ...styles.textStyle, color: 'black' }}>
                {t('home-tabs.messages-stack.messages.modal.cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => onRedirectToChat()}
            >
              <Text style={styles.textStyle}>
                {t('home-tabs.messages-stack.messages.modal.accept')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  },
  confirmBtn: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    elevation: 2,
    margin: 5,
    backgroundColor: 'green',
  },
  cancelBtn: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'green',
    margin: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
