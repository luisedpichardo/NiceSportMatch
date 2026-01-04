import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Stores
import { userStore } from '../stores/userStore';

export const TimeFormatSwitchSettOpt = () => {
  const { hour12Format, setHour12Format } = userStore();
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={{ ...styles.btn, backgroundColor: theme.transparent }}>
      <Text style={{ ...styles.txt, color: theme.border }}>
        {hour12Format
          ? t('settings.format-12-Hrs')
          : t('settings.format-24-Hrs')}
      </Text>

      <Switch
        trackColor={{ false: theme.secondary, true: theme.secondary }}
        thumbColor={theme.primary}
        onValueChange={() => setHour12Format(!hour12Format)}
        value={hour12Format}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
    paddingVertical: 25,
    marginVertical: 10,
  },
  txt: {
    fontSize: 25,
  },
});
