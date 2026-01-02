import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import { OpenSettings } from '../components/OpenSettings';
// Navigation
import { MatchesTab } from './MatchesTab';
// Screens
import { CreateMatch } from '../screens/CreateMatch';
import { UpdateMatch } from '../screens/UpdateMatch';
// Types
import { MatchNavStack } from './types';

const MatchSta = createNativeStackNavigator<MatchNavStack>();

export function MatchSatck() {
  return (
    <MatchSta.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <MatchSta.Screen
        name="Matches"
        component={MatchesTab}
        options={{
          headerRight: () => rightHeader(),
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
