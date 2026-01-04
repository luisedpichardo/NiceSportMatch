import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { OpenSettings } from '../components/OpenSettings';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Navigation
import { MatchesTab } from './MatchesTab';
// Screens
import { CreateMatch } from '../screens/CreateMatch';
import { UpdateMatch } from '../screens/UpdateMatch';
// Types
import { MatchNavStack } from './types';

const MatchSta = createNativeStackNavigator<MatchNavStack>();

export function MatchSatck() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <MatchSta.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackButtonDisplayMode: 'minimal',
        headerTitleStyle: { color: theme.textPrimary },
      }}
    >
      <MatchSta.Screen
        name="Matches"
        component={MatchesTab}
        options={{
          headerRight: () => rightHeader(),
          headerTitle: t('home-tabs.match-stack.matches.header-title'),
        }}
      />
      <MatchSta.Screen name="CreateMatch" component={CreateMatch} />
      <MatchSta.Screen name="UpdateMatch" component={UpdateMatch} />
    </MatchSta.Navigator>
  );
}

const rightHeader = () => {
  return <OpenSettings />;
};
