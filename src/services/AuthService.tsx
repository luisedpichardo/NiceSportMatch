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
  email: string,
  password: string,
) => {
  console.log('creating user');
  try {
    // get response for create user
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password,
    );
    const user: any = userCredential.user;
    // Get user credentials to save into firestore
    await firestore().collection('users').doc(user.email).set({
      email,
      firstName,
      lastName,
    });

  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('That email address is invalid!');
    } else {
      throw new Error(error.message ?? String(error));
    }
  } finally {
    // Sign out user even if it fails
    signOut(getAuth());
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
    throw new Error(e.message);
  }
};

// Sign out User
export const signOutService = async (email: string) => {
  // Remove device token for the notificatinos
  signOut(getAuth());
};


