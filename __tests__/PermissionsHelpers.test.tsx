import { PermissionsAndroid, Platform } from 'react-native';
import {
  requestLocationPermission,
  requestNotificationAndroidPermission,
  requestDeviceToken,
} from '../src/utils/PermissionsHelpers';

jest.mock('react-native', () => {
  return {
    // Allows us to change Platform.OS in tests
    Platform: {
      OS: 'android',
      select: jest.fn(dict => dict.android),
    },
    PermissionsAndroid: {
      request: jest.fn(),
      requestMultiple: jest.fn(),
      PERMISSIONS: {
        ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
        ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
        POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',
      },
      RESULTS: {
        GRANTED: 'granted',
        DENIED: 'denied',
      },
    },
  };
});

const mockGetToken = jest.fn();
const mockRegister = jest.fn();
const mockRequestPermission = jest.fn();

jest.mock('@react-native-firebase/messaging', () => {
  const messagingModule = () => ({
    getToken: mockGetToken,
    registerDeviceForRemoteMessages: mockRegister,
    requestPermission: mockRequestPermission,
  });
  messagingModule.AuthorizationStatus = {
    AUTHORIZED: 1,
    PROVISIONAL: 2,
  };
  return messagingModule;
});

describe('requestLocationPermission', () => {
  test('should return true if both permissions are granted on Android', async () => {
    Platform.OS = 'android';
    PermissionsAndroid.requestMultiple.mockResolvedValue({
      'android.permission.ACCESS_FINE_LOCATION': 'granted',
      'android.permission.ACCESS_COARSE_LOCATION': 'granted',
    });

    const result = await requestLocationPermission();
    expect(result).toBe(true);
  });

  test('should return false if one permission is denied', async () => {
    PermissionsAndroid.requestMultiple.mockResolvedValue({
      'android.permission.ACCESS_FINE_LOCATION': 'granted',
      'android.permission.ACCESS_COARSE_LOCATION': 'denied',
    });

    const result = await requestLocationPermission();
    expect(result).toBe(false);
  });
});

describe('Notification and Token Logic', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should request token if Android notification permission is granted', async () => {
    PermissionsAndroid.request.mockResolvedValue('granted');
    mockRegister.mockResolvedValue(true);
    mockGetToken.mockResolvedValue('fake-fcm-token');

    const token = await requestNotificationAndroidPermission();

    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      'android.permission.POST_NOTIFICATIONS',
    );
    expect(mockGetToken).toHaveBeenCalled();
    expect(token).toBe('fake-fcm-token');
  });

  test('should throw error if Android notification permission is denied', async () => {
    PermissionsAndroid.request.mockResolvedValue('denied');

    await expect(requestNotificationAndroidPermission()).rejects.toThrow(
      'Denied',
    );
  });

  test('should throw error if getToken fails', async () => {
    mockRegister.mockResolvedValue(true);
    mockGetToken.mockRejectedValue(new Error('Network error'));

    await expect(requestDeviceToken()).rejects.toThrow('Network error');
  });
});
