import { StyleSheet, Text, View } from 'react-native';

export const NoChats = () => {
  return (
    <View style={styles.noChatsCont}>
      <Text style={styles.noChatsTitl}>This feels kind of empty</Text>
      <Text style={styles.noChatSubT}>
        Start looking for matches to send messages!
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
    color: '#1F3D1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  noChatSubT: {
    fontSize: 15,
    color: '#2E5E2A',
    textAlign: 'center',
    opacity: 0.85,
  },
});
