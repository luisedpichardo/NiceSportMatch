import { StyleSheet, Text, View } from 'react-native';

export const NoMatches = () => {
  return (
    <View style={styles.noMatchesCont}>
      <Text style={styles.noMatchesTitl}>
        No matches to display!
      </Text>
      <Text style={styles.noMatchesubT}>
        Go to the map and add matches here
      </Text>
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
