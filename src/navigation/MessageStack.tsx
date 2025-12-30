import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Components
import { OpenSettings } from '../components/OpenSettings';
// Screens
import { Messages } from '../screens/Messages';
import { Chat } from '../screens/Chat';
// Types
import { ChatNavStack } from './types';

const ChatStack = createNativeStackNavigator<ChatNavStack>();

export function MessageStack() {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <ChatStack.Screen
        name="Messages"
        component={Messages}
        options={{
          headerRight: () => rightHeader(),
        }}
      />
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );
}

const rightHeader = () => {
  return <OpenSettings />;
};
