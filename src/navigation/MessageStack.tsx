import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChatNavStack } from './types';
import { Messages } from '../screens/Messages';

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
      {/* Next create screen for actual chat */}
      {/* <ChatStack.Screen name="Chat" component={CreateMatch} /> */}
    </ChatStack.Navigator>
  );
}
