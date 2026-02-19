import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Services
import { removeMatchFromUserService } from '../services/UserService';
// Stores
import { userStore } from '../stores/userStore';
import { useInternet } from '../hooks/useInternet';

type Props = {
  publisher: string;
  _id: string;
  removeCallBack: () => void;
};

type ChatStackParamList = {
  ChatNav: {
    screen: 'Messages';
    params: { someone: string };
  };
};

export const MatchNotOwnOpt = ({ publisher, _id, removeCallBack }: Props) => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const { theme } = useTheme();
  const { internetAccess } = useInternet();
  const chatNav =
    useNavigation<NativeStackNavigationProp<ChatStackParamList>>();
  const removeMatchFromUser = async () => {
    if (!username) return;
    try {
      await removeMatchFromUserService(_id, username);
      removeCallBack();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View
      testID="options"
      style={{ flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <TouchableOpacity
        testID="removeBtn"
        onPress={() => removeMatchFromUser()}
        style={{ ...styles.btn, backgroundColor: theme.error }}
        disabled={!internetAccess}
      >
        <Text testID="removeTxt" style={{ ...styles.txt, color: theme.border }}>
          {t('home-tabs.match-stack.matches.prev.not-interested')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="openChatBtn"
        onPress={() =>
          chatNav.navigate('ChatNav', {
            screen: 'Messages',
            params: { someone: publisher },
          })
        }
        style={{
          ...styles.btn,
          ...styles.openChatBtn,
          borderColor: theme.primary,
          backgroundColor: theme.secondary,
        }}
        disabled={!internetAccess}
      >
        <Text
          testID="openChatTxtBtn"
          style={{ ...styles.txt, color: theme.textPrimary }}
        >
          {t('home-tabs.match-stack.matches.prev.open-chat')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  openChatBtn: {
    borderWidth: 1,
  },
  txt: {
    fontWeight: 'bold',
  },
});
