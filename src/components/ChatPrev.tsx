import { Image, StyleSheet, Text, View } from 'react-native';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = {
  sender: string;
};

export const ChatPrev = ({ sender }: Props) => {
  const username = useUserStore(state => state.username);

  return (
    <View style={styles.container}>
      <View style={styles.chat}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../assets/account_pp_default.jpg')}
            style={styles.imgStyle}
          />
          <View style={{ marginLeft: 10, justifyContent: 'center' }}>
            <Text>{sender}</Text>
            <Text>Message: last message</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text>day 📅</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 20,
  },
  chat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatInfo: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  imgStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
