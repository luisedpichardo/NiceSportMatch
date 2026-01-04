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

type Props = {
  publisher: string;
  _id: string;
};

type ChatStackParamList = {
  ChatNav: {
    screen: 'Messages';
    params: { someone: string };
  };
};

export const MatchNotOwnOpt = ({ publisher, _id }: Props) => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const { theme } = useTheme();
  const chatNav =
    useNavigation<NativeStackNavigationProp<ChatStackParamList>>();
  const removeMatchFromUser = async () => {
    if (!username) return;
    try {
      await removeMatchFromUserService(_id, username);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => removeMatchFromUser()}
        style={{ ...styles.btn, backgroundColor: theme.error }}
      >
        <Text style={{ color: theme.border, fontWeight: 'bold' }}>
          {t('home-tabs.match-stack.matches.prev.not-interested')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
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
      >
        <Text style={{ fontWeight: 'bold' }}>
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
});
