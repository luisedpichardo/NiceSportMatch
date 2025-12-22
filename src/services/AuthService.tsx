import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const createUserWithEmailAndPasswordService = async (
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
) => {
  try {
    const lowUsername = username.toLowerCase();
    const invalidUsername = (
      await firestore().collection('users').doc(lowUsername).get()
    ).exists();
    // If username in use
    if (invalidUsername) throw new Error('Username must be unique');
    // Create user with email and password
    await createUserWithEmailAndPassword(getAuth(), email, password);
    // Save user info into firestore
    await firestore().collection('users').doc(lowUsername).set({
      email,
      username,
      firstName,
      lastName,
    });
    signOut(getAuth());
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('That email address is invalid!');
    } else {
      throw new Error(error.message ?? String(error));
    }
  }
};

export const signInWithEmailAndPasswordService = async (
  email: string,
  password: string,
) => {
  // Set context
  try {
    // Log in
    await signInWithEmailAndPassword(getAuth(), email, password);
    // Create token for push notifications
  } catch (e: any) {
    if (e.code === 'auth/invalid-credential') {
      throw new Error('This does not match our records!');
    } else {
      throw new Error(e.message ?? String(e));
    }
  }
};

// Sign out User
export const signOutService = async (email: string) => {
  // Remove device token for the notificatinos
  signOut(getAuth());
};

// Read users
export const readUsersService = async () => {
  try {
    const users = (await firestore().collection('users').get()).docs;
    return users;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
