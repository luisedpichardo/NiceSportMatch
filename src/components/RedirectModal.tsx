import { useTranslation } from 'react-i18next';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

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
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const onRedirectToChat = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Chat', { someone });
  };

  const cancelChat = () => {
    setModalVisible(!modalVisible);
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
          <Text style={{ fontSize: 25 }}>
            {t('home-tabs.messages-stack.messages.modal.continue')} {someone}?
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ ...styles.cancelBtn, borderColor: theme.primary }}
              onPress={() => cancelChat()}
            >
              <Text style={{ ...styles.textStyle, color: theme.textPrimary }}>
                {t('home-tabs.messages-stack.messages.modal.cancel')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.confirmBtn, backgroundColor: theme.primary }}
              onPress={() => onRedirectToChat()}
            >
              <Text style={{ ...styles.textStyle, color: theme.border }}>
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
  },
  modalView: {
    alignItems: 'center',
    margin: 15,
    borderRadius: 20,
    padding: 35,
  },
  confirmBtn: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    elevation: 2,
    margin: 5,
  },
  cancelBtn: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    elevation: 2,
    borderWidth: 2,
    margin: 5,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
