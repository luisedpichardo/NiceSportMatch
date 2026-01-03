import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
// Stores
import { useStore } from '../stores/userStore';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = {
  someone: string;
};

export const NoMessagesInChat = ({ someone }: Props) => {
  const { t } = useTranslation();
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <View style={styles.noMessaCont}>
      <Text style={{ ...styles.noMessaTitl, color: theme.textPrimary }}>
        {t('home-tabs.messages-stack.chat.no-mess-title')}
      </Text>
      <Text style={{ ...styles.noMessaSubT, color: theme.textSecondary }}>
        {t('home-tabs.messages-stack.chat.no-mess-subtitle', { someone })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noMessaCont: {
    flex: 1,
    marginTop: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noMessaTitl: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  noMessaSubT: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.85,
  },
});
