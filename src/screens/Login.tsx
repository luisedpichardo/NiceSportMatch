import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Types
import { NavRoot } from '../navigation/types';
import { LoginForm } from '../components/LoginForm';

type Props = NativeStackScreenProps<NavRoot, 'Login'>;

export const Login = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Login</Text>
      <View style={styles.formContatiner}>
        <LoginForm />

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => console.log('go to sign up')}
            style={{
              alignItems: 'center',
              backgroundColor: 'lightgreen',
              borderRadius: 20,
              paddingVertical: 5,
            }}
          >
            <Text>No Accoutn ?</Text>
            <Text>Sign up instead</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    paddingTop: 30,
  },
  titleStyle: {
    paddingTop: 80,
    paddingLeft: 30,
    paddingBottom: 10,
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
  },
  formContatiner: {
    flex: 1,
    backgroundColor: 'white',
    margin: 30,
    marginTop: '30%',
    marginBottom: '30%',
    borderRadius: 25,
    padding: 30,
  },
});
