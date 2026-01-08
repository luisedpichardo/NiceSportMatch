import { Image, Alert, Platform } from 'react-native';
import {
  createUserWithEmailAndPasswordService,
  signInWithEmailAndPasswordService,
  signOutService,
} from '../src/services/AuthService';
import {
  createUserWithEmailAndPassword,
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

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: mockCollection,
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

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: mockCollection,
}));

Image.resolveAssetSource = jest.fn().mockReturnValue({ uri: 'mock-uri' });

describe('createUserWithEmailAndPasswordService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should throw an error if the username already exists', async () => {
    mockGet.mockResolvedValue({ exists: () => true });

    await expect(
      createUserWithEmailAndPasswordService(
        'John',
        'Doe',
        'johndoe',
        'test@test.com',
        '123456',
      ),
    ).rejects.toThrow('Username must be unique');

    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  test('should create user in Auth and then save to Firestore', async () => {
    mockGet.mockResolvedValue({ exists: () => false });
    createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: '123' } });

    await createUserWithEmailAndPasswordService(
      'John',
      'Doe',
      'johndoe',
      'test@test.com',
      '123456',
    );

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      'test@test.com',
      '123456',
    );
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        username: 'johndoe',
        email: 'test@test.com',
      }),
    );
  });
});

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getAuth as jest.fn).mockReturnValue({
      currentUser: { email: 'test@test.com' },
    });
  });

  describe('createUserWithEmailAndPasswordService Errors', () => {
    test('should throw specific error when email is already in use', async () => {
      mockGet.mockResolvedValue({ exists: () => false });
      (createUserWithEmailAndPassword as jest.fn).mockRejectedValue({
        code: 'auth/email-already-in-use',
      });

      await expect(
        createUserWithEmailAndPasswordService(
          'J',
          'D',
          'user',
          'test@test.com',
          '123',
        ),
      ).rejects.toThrow('That email address is already in use!');
    });

    test('should throw specific error when email is invalid', async () => {
      mockGet.mockResolvedValue({ exists: () => false });
      (createUserWithEmailAndPassword as jest.fn).mockRejectedValue({
        code: 'auth/invalid-email',
      });

      await expect(
        createUserWithEmailAndPasswordService(
          'J',
          'D',
          'user',
          'bad-email',
          '123',
        ),
      ).rejects.toThrow('That email address is invalid!');
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
