import { matchAddedNotificationService } from '../src/services/TokenNotifService';
import * as UserService from '../src/services/UserService';

// Mock Firestore chain
const mockUpdate = jest.fn();
const mockGet = jest.fn();
const mockDoc = jest.fn(() => ({
  get: mockGet,
  update: mockUpdate,
}));
const mockCollection = jest.fn(() => ({
  doc: mockDoc,
}));

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: mockCollection,
}));

// Mock External Notification Service
jest.mock('../src/services/TokenNotifService', () => ({
  matchAddedNotificationService: jest.fn(),
}));

describe('readFieldsToUpdateUserService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('should return age if age exists in database', async () => {
    mockGet.mockResolvedValue({
      data: () => ({ firstName: 'John', lastName: 'Doe', age: 25 }),
    });

    const result = await UserService.readFieldsToUpdateUserService('johndoe');
    expect(result).toEqual({ firstName: 'John', lastName: 'Doe', age: 25 });
  });

  test('should return only names if age does not exist', async () => {
    mockGet.mockResolvedValue({
      data: () => ({ firstName: 'John', lastName: 'Doe' }),
    });

    const result = await UserService.readFieldsToUpdateUserService('johndoe');
    expect(result).toEqual({ firstName: 'John', lastName: 'Doe' });
  });
});

describe('addMatchIdToUserService', () => {
  test('should append a matchId to an existing list and trigger notification', async () => {
    mockGet.mockResolvedValue({
      data: () => ({ matchesIds: ['id-1'] }),
    });

    await UserService.addMatchIdToUserService('me', 'them', 'id-2');

    expect(mockUpdate).toHaveBeenCalledWith({
      matchesIds: ['id-1', 'id-2'],
    });

    expect(matchAddedNotificationService).toHaveBeenCalledWith('me', 'them');
  });

  test('should create a new array if matchesIds is missing', async () => {
    mockGet.mockResolvedValue({ data: () => ({}) });

    await UserService.addMatchIdToUserService('me', 'them', 'id-1');

    expect(mockUpdate).toHaveBeenCalledWith({ matchesIds: ['id-1'] });
  });
});

describe('addReferenceForUserChatService', () => {
  test('should move an existing chat reference to the front of the list', async () => {
    // Existing list has 'userB' at the end
    mockGet.mockResolvedValue({
      data: () => ({ chatsRef: ['userA', 'userB'] }),
    });

    await UserService.addReferenceForUserChatService('currentUser', 'userB');

    // Expect 'userB' to be moved to index 0
    expect(mockUpdate).toHaveBeenCalledWith({
      chatsRef: ['userB', 'userA'],
    });
  });
});

describe('removeMatchFromUserService', () => {
  test('should remove id from the list', async () => {
    mockGet.mockResolvedValue({
      data: () => ({ matchesIds: ['match3', 'match2'] }),
    });
    await UserService.removeMatchFromUserService('match3', 'username');

    expect(mockUpdate).toHaveBeenCalledWith({
      matchesIds: ['match2'],
    });
  });
});

describe('getChatsForUsersService', () => {
  test('returns chat references', async () => {
    const mockChats = ['username2', 'username1'];

    mockGet.mockResolvedValue({
      data: () => ({ chatsRef: mockChats }),
    });

    const chats = await UserService.getChatsForUsersService('username');

    expect(chats).toEqual(mockChats);
  });
});
