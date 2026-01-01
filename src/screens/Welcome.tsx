import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { Background } from '../components/Background';
import { WelcomeImg } from '../components/WelcomeImg';
// Types
import { NavAuthStack } from '../navigation/types';

type Props = NativeStackScreenProps<NavAuthStack, 'Welcome'>;

export const Welcome = ({ navigation }: Props) => {
  return (
    <Background
      colors={['white', 'lightgreen', 'green']}
      style={styles.container}
    >
      <WelcomeImg />
      <View style={styles.optCont}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ ...styles.btnStyle, backgroundColor: 'green' }}
        >
          <Text style={{ ...styles.textStyle, color: 'white' }}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{ ...styles.btnStyle, backgroundColor: 'white' }}
        >
          <Text style={styles.textStyle}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '20%',
    marginHorizontal: 50,
  },
  btnStyle: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 35,
  },
  textStyle: {
    fontSize: 20,
  },
});
