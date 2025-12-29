import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <ChatStack.Screen name="Messages" component={Messages} />
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );
}
