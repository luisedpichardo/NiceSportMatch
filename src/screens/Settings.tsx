import { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAuth } from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
// Components
import { SettingsOptions } from '../components/SettingsOptions';
import { RightHdrBtn } from '../components/RightHdrBtn';
// Services
import { signOutService } from '../services/AuthService';
// Types
import { NavRoot } from '../navigation/types';

type Props = NativeStackScreenProps<NavRoot, 'Settings'>;

export const Settings = ({ navigation }: Props) => {
  const { t } = useTranslation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('settings.header-title'),
    });
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
    });
    const user: any = getAuth().currentUser;
    if (!user) noUserDetected();
  }, [navigation]);

  const headerRight = () => {
    return (
      <RightHdrBtn
        onPress={signOut}
        text={t('settings.log-out')}
        color="black"
      />
    );
  };

  const signOut = async () => {
    // Remove
    const user: any = getAuth().currentUser;
    signOutService(user.email).catch((err: any) => {
      Alert.alert(t('settings.error'), err);
    });
  };

  const noUserDetected = async () => {
    signOut();
    Alert.alert(t('settings.error'), t('settings.err-mess'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.settCont}>
        <SettingsOptions
          onPress={() => navigation.navigate('ProfileInfo')}
          text={t('settings.prof-info')}
        />
        <SettingsOptions
          onPress={() => console.log('selecting Languages')}
          text={t('settings.select-lang')}
        />
        <SettingsOptions
          onPress={() => console.log('going to theme')}
          text={t('settings.select-theme')}
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
