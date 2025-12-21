// Navigation
import { AuthStack } from './AuthStack';
import { MyMain } from './MyMain';
// Stores
import { useUserStore } from '../stores/userStore';

export const Navigation = () => {
  const user = useUserStore(state => state.user);
  return <>{user ? <MyMain /> : <AuthStack />}</>;
};
