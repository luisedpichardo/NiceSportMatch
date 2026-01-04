import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { RightHdrBtn } from './RightHdrBtn';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Navigation
import { NavRoot } from '../navigation/types';

export const OpenSettings = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<NavRoot>>();

  return (
    <RightHdrBtn
      text={t('home-tabs.open-settings')}
      color={theme.textPrimary}
      onPress={() => navigation.navigate('Settings')}
    />
  );
};
