import { StyleSheet, Text, View } from 'react-native';

type Props = {
  someone: string;
};

export const NoMessagesInChat = ({ someone }: Props) => {
  return (
    <View style={styles.noMessaCont}>
      <Text style={styles.noMessaTitl}>Start the conversation</Text>
      <Text style={styles.noMessaSubT}>
        Say hi to {someone} and break the ice!
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
    color: '#1F3D1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  noMessaSubT: {
    fontSize: 15,
    color: '#2E5E2A',
    textAlign: 'center',
    opacity: 0.85,
  },
});
