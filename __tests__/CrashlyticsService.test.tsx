import {
  onSignUpService,
  onLogInService,
  crashService,
} from '../src/services/CrashlyticsService';
import crashlytics from '@react-native-firebase/crashlytics';

// Mock the entire crashlytics module
const mockLog = jest.fn();
const mockSetUserId = jest.fn();
const mockSetAttributes = jest.fn();
const mockRecordError = jest.fn();

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    log: mockLog,
    setUserId: mockSetUserId,
    setAttributes: mockSetAttributes,
    recordError: mockRecordError,
  });
});

describe('Crashlytics Service', () => {
  const mockUser = {
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log signup and set user attributes', async () => {
    await onSignUpService(mockUser);

    expect(crashlytics().log).toHaveBeenCalledWith('User signed up');
    expect(crashlytics().setUserId).toHaveBeenCalledWith(mockUser.username);
    expect(crashlytics().setAttributes).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
    });
  });

  it('should log login and set user ID', async () => {
    await onLogInService(mockUser);

    expect(crashlytics().log).toHaveBeenCalledWith('User logging in.');
    expect(crashlytics().setUserId).toHaveBeenCalledWith(mockUser.email);
  });

  it('should record an error when crashService is called', async () => {
    const error = new Error('Test Error');
    await crashService(error);

    expect(crashlytics().recordError).toHaveBeenCalledWith(error);
  });
});
