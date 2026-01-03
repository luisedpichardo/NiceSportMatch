import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { ImageProfile } from '../components/ImageProfile';
import { ProfileFields } from '../components/ProfileFields';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Types
import { NavRoot } from '../navigation/types';

type Props = NativeStackScreenProps<NavRoot, 'ProfileInfo'>;

export const ProfileInfo = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('settings.profile.info.header-title'),
    });
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      <ImageProfile />
      <ProfileFields />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '30%',
    paddingBottom: '30%',
    padding: 30,
  },
});
