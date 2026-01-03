import { useEffect } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { ImageProfile } from '../components/ImageProfile';
import { ProfileFields } from '../components/ProfileFields';
// Types
import { NavRoot } from '../navigation/types';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

type Props = NativeStackScreenProps<NavRoot, 'ProfileInfo'>;

export const ProfileInfo = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

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
