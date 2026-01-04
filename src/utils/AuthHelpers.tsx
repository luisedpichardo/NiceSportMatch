// Services
import { readUsersService } from '../services/AuthService';
// Stores
import { userStore } from '../stores/userStore';

// Find the username of current
export const assignUsernameToStore = () => {
  readUsersService().then(users => {
    const user = users.find(
      elem => elem.data().email === userStore.getState().user.email,
    );
    if (user) {
      const username = user?.data().username;
      // Assing email to the store
      userStore.getState().setUsername(username);
    } else {
      throw new Error('Could not get username');
    }
  });
};

export const removeUsernameFromStore = () => {
  userStore.getState().setUsername('');
};
