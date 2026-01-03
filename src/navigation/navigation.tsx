// Navigation
import { AuthStack } from './AuthStack';
import { MyMain } from './MyMain';
// Stores
import { useStore } from '../stores/userStore';

export const Navigation = () => {
  const user = useStore(state => state.user);
  return <>{user ? <MyMain /> : <AuthStack />}</>;
};
