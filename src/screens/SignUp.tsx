import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Types
import { NavRoot } from '../navigation/types';
import { SignUpForm } from '../components/SignUpForm';

type Props = NativeStackScreenProps<NavRoot, 'SignUp'>;

export const SignUp = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>SignUp</Text>
      <View style={styles.formContatiner}>
        <SignUpForm />

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignItems: 'center',
              backgroundColor: 'lightgreen',
              borderRadius: 20,
              paddingVertical: 5,
            }}
          >
            <Text>Have an account?</Text>
            <Text>Log in instead!</Text>
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
