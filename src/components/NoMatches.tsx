import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

type Props = {
  own: boolean;
};

export const NoMatches = ({ own }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View testID="container" style={styles.noMatchesCont}>
      {own ? (
        <>
          <Text style={{ ...styles.noMatchesTitl, color: theme.textPrimary }}>
            {t('home-tabs.match-stack.matches.no-matches.title')}
          </Text>
          <Text style={{ ...styles.noMatchesubT, color: theme.textSecondary }}>
            {t('home-tabs.match-stack.matches.no-matches.subtitle')}
          </Text>
        </>
      ) : (
        <>
          <Text style={{ ...styles.noMatchesTitl, color: theme.textPrimary }}>
            {t('home-tabs.match-stack.matches.no-matches.no-title')}
          </Text>
          <Text style={{ ...styles.noMatchesubT, color: theme.textSecondary }}>
            {t('home-tabs.match-stack.matches.no-matches.no-subtitle')}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noMatchesCont: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  noMatchesTitl: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  noMatchesubT: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.85,
  },
});
