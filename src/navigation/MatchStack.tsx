import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import { OpenSettings } from '../components/OpenSettings';
// Screens
import { Matches } from '../screens/Matches';
import { CreateMatch } from '../screens/CreateMatch';
import { UpdateMatch } from '../screens/UpdateMatch';
// Types
import { MatchNavStack } from './types';

const MatchSta = createNativeStackNavigator<MatchNavStack>();

export function MatchSatck() {
  return (
    <MatchSta.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <MatchSta.Screen
        name="Matches"
        component={Matches}
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
