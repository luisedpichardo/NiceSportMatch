import { createUserWithEmailAndPasswordService } from '../src/services/AuthService';
import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { Image } from 'react-native';

// 1. Mock Auth Functions
jest.mock('@react-native-firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: { email: 'test@test.com' } })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

// 2. Mock Firestore (Chained)
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

// 3. Mock Native Image Assets
Image.resolveAssetSource = jest.fn().mockReturnValue({ uri: 'mock-uri' });

describe('createUserWithEmailAndPasswordService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should throw an error if the username already exists', async () => {
    // Simulate user existing in Firestore
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

    // Ensure auth was NEVER called
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('should create user in Auth and then save to Firestore', async () => {
    // Simulate username is available
    mockGet.mockResolvedValue({ exists: () => false });
    createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: '123' } });

    await createUserWithEmailAndPasswordService(
      'John',
      'Doe',
      'johndoe',
      'test@test.com',
      '123456',
    );

    // Check lowercase conversion logic
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
