import { StyleSheet, Text, View } from 'react-native';

export const NoChats = () => {
  return (
    <View style={styles.noChatsCont}>
      <Text style={styles.noChatsTitl}>This feels kind of empty</Text>
      <Text style={styles.noChatSubT}>
        Start a converstion with a publisher of a match!
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
