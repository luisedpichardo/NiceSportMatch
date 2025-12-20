import { Alert, StyleSheet, View } from 'react-native';
import { ImageProfile } from '../components/ImageProfile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { getAuth } from '@react-native-firebase/auth';
// Components
import { RightHdrBtn } from '../components/RightHdrBtn';
import { ProfileFields } from '../components/ProfileFields';
// Services
import { signOutService } from '../services/AuthService';
// Types
import { NavRoot } from '../navigation/types';

type Props = NativeStackScreenProps<NavRoot, 'ProfileInfo'>;

export const ProfileInfo = ({ navigation }: Props) => {
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
        <View>
          <ImageProfile />
          {/* Rating */}
          {/* Profile info */}
          <ProfileFields />
        </View>
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
