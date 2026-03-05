import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import { OpenSettings } from '../components/OpenSettings';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Screens
import { Messages } from '../screens/Messages';
import { Chat } from '../screens/Chat';
// Types
import { ChatNavStack } from './types';

const ChatStack = createNativeStackNavigator<ChatNavStack>();

export function MessageStack() {
  const { theme } = useTheme();

  return (
    <ChatStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackButtonDisplayMode: 'minimal',
        headerTitleStyle: { color: theme.textPrimary },
      }}
    >
      <ChatStack.Screen
        name="Messages"
        component={Messages}
        options={{
          headerRight: () => rightHeader(),
        }}
      />
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTransparent: false,
        }}
      />
    </ChatStack.Navigator>
  );
}

const rightHeader = () => {
  return <OpenSettings />;
};
