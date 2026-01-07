import { Alert, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  retrieveDeviceTokenService,
  addDeviceToken,
} from '../src/services/TokenNotifService';
import {
  requestNotificationIOSPermission,
  requestNotificationAndroidPermission,
} from '../src/utils/PermissionsHelpers';

jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { email: 'test@example.com' },
  })),
}));

const mockUpdate = jest.fn();
const mockSet = jest.fn();
const mockGet = jest.fn();
const mockDoc = jest.fn(() => ({
  get: mockGet,
  update: mockUpdate,
  set: mockSet,
}));
const mockCollection = jest.fn(() => ({
  doc: mockDoc,
}));

jest.mock('@react-native-firebase/firestore', () => {
  const authMock = () => ({
    collection: mockCollection,
  });
  return authMock;
});

jest.mock('react-native-device-info', () => ({
  isEmulator: jest.fn(),
}));

jest.mock('../src/utils/PermissionsHelpers', () => ({
  requestNotificationIOSPermission: jest.fn(),
  requestNotificationAndroidPermission: jest.fn(),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('retrieveDeviceTokenService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show an alert and not request permission if on emulator', async () => {
    DeviceInfo.isEmulator.mockResolvedValue(true);

    await retrieveDeviceTokenService();

    expect(Alert.alert).toHaveBeenCalledWith(
      expect.stringContaining('not on real device'),
    );
    expect(requestNotificationIOSPermission).not.toHaveBeenCalled();
  });
});

test('should request Android permission and add token to firestore', async () => {
  DeviceInfo.isEmulator.mockResolvedValue(false);
  Platform.OS = 'android';
  requestNotificationAndroidPermission.mockResolvedValue('mock-android-token');

  // Mock firestore doc not existing yet (first time)
  mockGet.mockResolvedValue({ data: () => ({}) });

  await retrieveDeviceTokenService();

  expect(requestNotificationAndroidPermission).toHaveBeenCalled();
  expect(mockSet).toHaveBeenCalledWith({
    deviceTokens: ['mock-android-token'],
  });
});

describe('addDeviceToken', () => {
  test('should append a new token to the existing list', async () => {
    const email = 'test@example.com';
    const newToken = 'token-2';

    // Simulate existing tokens in DB
    mockGet.mockResolvedValue({
      data: () => ({ deviceTokens: ['token-1'] }),
    });

    await addDeviceToken(email, newToken);

    expect(mockUpdate).toHaveBeenCalledWith({
      deviceTokens: ['token-1', 'token-2'],
    });
  });
});
