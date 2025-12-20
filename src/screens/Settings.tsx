import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Switch,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Types
import { NavRoot } from '../navigation/types';
import { SettingsOptions } from '../components/SettingsOptions';

type Props = NativeStackScreenProps<NavRoot, 'Settings'>;

export const Settings = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Settings</Text>
      <View style={styles.form}>
        <SettingsOptions
          onPress={() => navigation.navigate('ProfileInfo')}
          text="Profile Info"
        />
        <SettingsOptions
          onPress={() => console.log('selecting Languages')}
          text="Select Language"
        />
        <SettingsOptions
          onPress={() => console.log('going to theme')}
          text="Profile Info"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    padding: 30,
    paddingTop: '30%',
    paddingBottom: '30%',
  },
  titleStyle: {
    flex: 1,
    paddingTop: 80,
    paddingLeft: 30,
    paddingBottom: 10,
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
  },
  form: {
    flex: 4,
    backgroundColor: 'gray',
    borderRadius: 25,
    padding: 30,
    justifyContent: 'center',
  },
});
