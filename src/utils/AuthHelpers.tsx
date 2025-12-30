// Services
import { readUsersService } from '../services/AuthService';
// Stores
import { useUserStore } from '../stores/userStore';

// Find the username of current
export const assignUsernameToStore = () => {
  readUsersService().then(users => {
    const user = users.find(
      elem => elem.data().email === useUserStore.getState().user.email,
    );
    if (user) {
      const username = user?.data().username;
      // Assing email to the store
      useUserStore.getState().setUsername(username);
    } else {
      throw new Error('Could not get username');
    }
  });
};

export const removeUsernameFromStore = () => {
  useUserStore.getState().setUsername('');
};
