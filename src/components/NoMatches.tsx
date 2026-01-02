import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  own: boolean;
};

export const NoMatches = ({ own }: Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.noMatchesCont}>
      {own ? (
        <>
          <Text style={styles.noMatchesTitl}>Add Matches</Text>
          <Text style={styles.noMatchesubT}>
            There is nothing to display here yet
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.noMatchesTitl}>
            {t('home-tabs.match-stack.matches.no-matches.title')}
          </Text>
          <Text style={styles.noMatchesubT}>
            {t('home-tabs.match-stack.matches.no-matches.subtitle')}
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
