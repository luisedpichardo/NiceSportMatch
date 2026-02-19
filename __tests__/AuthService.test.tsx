import { Image, Alert, Platform } from 'react-native';
import {
  signInWithEmailAndPasswordService,
  signOutService,
} from '../src/services/AuthService';
import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from '@react-native-firebase/auth';
import DeviceInfo from 'react-native-device-info';
import { removeDeviceToken } from '../src/services/TokenNotifService';
import {
  requestNotificationAndroidPermission,
  requestNotificationIOSPermission,
} from '../src/utils/PermissionsHelpers';

jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: mockCollection,
  doc: jest.fn((db, collectionPath, docId) => ({
    path: `${collectionPath}/${docId}`,
  })),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({ isEmulator: jest.fn() }));
jest.mock('../src/services/TokenNotifService', () => ({
  removeDeviceToken: jest.fn(),
}));
jest.mock('../src/utils/PermissionsHelpers', () => ({
  requestNotificationAndroidPermission: jest.fn(),
  requestNotificationIOSPermission: jest.fn(),
}));

Image.resolveAssetSource = jest.fn().mockReturnValue({ uri: 'mock-uri' });
const spyAlert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: { email: 'test@test.com' } })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

const mockSet = jest.fn();
const mockGet = jest.fn();
const mockDoc = jest.fn(() => ({
  get: mockGet,
  set: mockSet,
}));
const mockCollection = jest.fn(() => ({
  doc: mockDoc,
}));

Image.resolveAssetSource = jest.fn().mockReturnValue({ uri: 'mock-uri' });

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getAuth as jest.fn).mockReturnValue({
      currentUser: { email: 'test@test.com' },
    });
  });

  describe('signInWithEmailAndPasswordService', () => {
    test('should sign in successfully', async () => {
      (signInWithEmailAndPassword as jest.fn).mockResolvedValue({});
      await signInWithEmailAndPasswordService('test@test.com', 'password');
      expect(signInWithEmailAndPassword).toHaveBeenCalled();
    });

    test('should handle invalid credentials error', async () => {
      (signInWithEmailAndPassword as jest.fn).mockRejectedValue({
        code: 'auth/invalid-credential',
      });
      await expect(signInWithEmailAndPasswordService('a', 'b')).rejects.toThrow(
        'This does not match our records!',
      );
    });

    test('should handle network failure', async () => {
      (signInWithEmailAndPassword as jest.fn).mockRejectedValue({
        code: 'auth/network-request-failed',
      });
      await expect(signInWithEmailAndPasswordService('a', 'b')).rejects.toThrow(
        'Seems that there is no internet',
      );
    });
  });

  describe('signOutService', () => {
    test('should show alert if user is on emulator', async () => {
      (DeviceInfo.isEmulator as jest.fn).mockResolvedValue(true);
      await signOutService();
      expect(spyAlert).toHaveBeenCalledWith(
        'Thanks for trying our app using an emulator!',
      );
      expect(signOut).toHaveBeenCalled();
    });

    test('should request iOS permissions and remove token if on iOS', async () => {
      Platform.OS = 'ios';
      (DeviceInfo.isEmulator as jest.fn).mockResolvedValue(false);
      (requestNotificationIOSPermission as jest.fn).mockResolvedValue(
        'ios-token',
      );

      await signOutService();

      expect(requestNotificationIOSPermission).toHaveBeenCalled();
      expect(removeDeviceToken).toHaveBeenCalledWith(
        'test@test.com',
        'ios-token',
      );
    });

    test('should request Android permissions and remove token if on Android', async () => {
      Platform.OS = 'android';
      (DeviceInfo.isEmulator as jest.fn).mockResolvedValue(false);
      (requestNotificationAndroidPermission as jest.fn).mockResolvedValue(
        'android-token',
      );

      await signOutService();

      expect(requestNotificationAndroidPermission).toHaveBeenCalled();
      expect(removeDeviceToken).toHaveBeenCalledWith(
        'test@test.com',
        'android-token',
      );
    });
  });
});
