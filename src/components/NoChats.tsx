import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export const NoChats = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.noChatsCont}>
      <Text style={styles.noChatsTitl}>
        {t('home-tabs.messages-stack.messages.no-mess.title')}
      </Text>
      <Text style={styles.noChatSubT}>
        {t('home-tabs.messages-stack.messages.no-mess.subtitle')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noChatsCont: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noChatsTitl: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  noChatSubT: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.85,
  },
});
