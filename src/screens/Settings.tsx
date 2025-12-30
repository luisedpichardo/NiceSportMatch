import { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth } from '@react-native-firebase/auth';
// Components
import { SettingsOptions } from '../components/SettingsOptions';
import { RightHdrBtn } from '../components/RightHdrBtn';
// Services
import { signOutService } from '../services/AuthService';
// Types
import { NavRoot } from '../navigation/types';

type Props = NativeStackScreenProps<NavRoot, 'Settings'>;

export const Settings = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
    });
    const user: any = getAuth().currentUser;
    if (!user) noUserDetected();
  }, [navigation]);

  const headerRight = () => {
    return <RightHdrBtn onPress={signOut} text="Log Out" color="black" />;
  };

  const signOut = async () => {
    // Remove
    const user: any = getAuth().currentUser;
    signOutService(user.email).catch((err: any) => {
      Alert.alert('Error', err);
    });
  };

  const noUserDetected = async () => {
    signOut();
    Alert.alert('Error', 'No valid user');
  };

  return (
    <View style={styles.container}>
      <View style={styles.settCont}>
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
          text="Select Theme"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    paddingTop: '30%',
    paddingBottom: '30%',
  },
  settCont: {
    flex: 4,
    margin: 30,
    justifyContent: 'center',
  },
});
