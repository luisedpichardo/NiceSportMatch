import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  publisher: string;
};

export const MatchNotOwnOpt = ({ publisher }: Props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => console.log('stopped showing interest')}
        style={{ ...styles.btn, backgroundColor: 'red' }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          Not interested
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('openning chat with publisher', publisher)}
        style={{ ...styles.btn, ...styles.openChatBtn }}
      >
        <Text style={{ fontWeight: 'bold' }}>Open Chat</Text>
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
    backgroundColor: 'lightgreen',
    borderWidth: 1,
    borderColor: 'green',
  },
});
