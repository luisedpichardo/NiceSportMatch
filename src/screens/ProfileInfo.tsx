import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Components
import { ImageProfile } from '../components/ImageProfile';
import { ProfileFields } from '../components/ProfileFields';
// Types
import { NavRoot } from '../navigation/types';

type Props = NativeStackScreenProps<NavRoot, 'ProfileInfo'>;

export const ProfileInfo = ({ navigation }: Props) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Profile Info',
    });
  });

  return (
    <View style={styles.container}>
      <ImageProfile />
      {/* Rating */}
      <ProfileFields />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    paddingTop: '30%',
    paddingBottom: '30%',
    padding: 30,
  },
});
