// Navigation
import { AuthStack } from './AuthStack';
import { MyMain } from './MyMain';
// Stores
import { userStore } from '../stores/userStore';

export const Navigation = () => {
  const user = userStore(state => state.user);
  return <>{user ? <MyMain /> : <AuthStack />}</>;
};
