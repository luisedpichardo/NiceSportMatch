import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { RightHdrBtn } from './RightHdrBtn';
// Navigation
import { NavRoot } from '../navigation/types';

export const OpenSettings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<NavRoot>>();
  return (
    <RightHdrBtn
      text={t('home-tabs.open-settings')}
      color="black"
      onPress={() => navigation.navigate('Settings')}
    />
  );
};
