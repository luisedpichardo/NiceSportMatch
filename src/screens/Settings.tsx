import { useEffect, useState } from 'react';
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
import { getAuth } from '@react-native-firebase/auth';
// Components
import { RightHdrBtn } from '../components/RightHdrBtn';
import { ImageProfile } from '../components/ImageProfile';
// Types
import { NavRoot } from '../navigation/types';
// Services
import { signOutService } from '../services/AuthService';

type Props = NativeStackScreenProps<NavRoot, 'Settings'>;

export const Settings = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerTintColor: 'white',
      headerRight: () => headerRight(),
    });
    const user: any = getAuth().currentUser;
    if (!user) noUserDetected();
  }, [navigation]);

  const headerRight = () => {
    return <RightHdrBtn onPress={signOut} text="Log Out" />;
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
      <View style={styles.form}>
        <ImageProfile />
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
  form: {
    flex: 3,
    backgroundColor: 'gray',
    borderRadius: 25,
    padding: 30,
  },
});
