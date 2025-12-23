import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavAuthStack } from '../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
// Components
import { WelcomeImg } from '../components/WelcomeImg';

type Props = NativeStackScreenProps<NavAuthStack, 'Welcome'>;

export const Welcome = ({ navigation }: Props) => {
  return (
    <LinearGradient
      colors={['white', 'lightgreen', 'green']}
      style={styles.container}
      useAngle={true}
      angle={135}
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
    </LinearGradient>
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
