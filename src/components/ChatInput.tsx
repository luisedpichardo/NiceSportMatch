import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const ChatInput = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
      <View style={{ flex: 1 }}></View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTxt}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '25%',
    marginHorizontal: '10%',
  },
  input: {
    flex: 16,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  btn: {
    flex: 4,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  btnTxt: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
