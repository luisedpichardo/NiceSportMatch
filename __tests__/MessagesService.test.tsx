import { sendMessageService } from '../src/services/MessagesService';
import { addReferenceForUserChatService } from '../src/services/UserService';
import { newMessageNotificationService } from '../src/services/TokenNotifService';

jest.mock('react-native-uuid', () => ({
  v4: jest.fn(() => 'fixed-uuid-123'),
}));

const mockSet = jest.fn();
const mockDoc = jest.fn(() => ({
  set: mockSet,
}));
const mockCollection = jest.fn(() => ({
  doc: mockDoc,
}));

jest.mock('@react-native-firebase/firestore', () => {
  const firestoreMock = () => ({
    collection: mockCollection,
  });
  firestoreMock.serverTimestamp = jest.fn(() => 'mock-timestamp');
  return firestoreMock;
});

jest.mock('../src/services/UserService', () => ({
  addReferenceForUserChatService: jest.fn(),
}));

jest.mock('../src/services/TokenNotifService', () => ({
  newMessageNotificationService: jest.fn(),
}));

describe('sendMessageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should successfully send a message and trigger notifications', async () => {
    const sender = 'userA';
    const receiver = 'userB';
    const message = 'Hello there!';

    await sendMessageService(sender, receiver, message);

    // Verify Firestore Write
    const expectedMessage = {
      _id: 'fixed-uuid-123', // From our UUID mock
      sender,
      receiver,
      message,
      time: 'mock-timestamp', // From our serverTimestamp mock
    };

    expect(mockCollection).toHaveBeenCalledWith('messages');
    expect(mockDoc).toHaveBeenCalledWith('fixed-uuid-123');
    expect(mockSet).toHaveBeenCalledWith(expectedMessage);

    // Verify User References (called twice for both directions)
    expect(addReferenceForUserChatService).toHaveBeenCalledTimes(2);
    expect(addReferenceForUserChatService).toHaveBeenCalledWith(
      sender,
      receiver,
    );
    expect(addReferenceForUserChatService).toHaveBeenCalledWith(
      receiver,
      sender,
    );

    // Verify Notification Service
    expect(newMessageNotificationService).toHaveBeenCalledWith(expectedMessage);
  });

  test('should throw an error if firestore fails', async () => {
    mockSet.mockRejectedValueOnce(new Error('Firestore Fail'));

    await expect(sendMessageService('s', 'r', 'm')).rejects.toThrow(
      'Firestore Fail',
    );
  });
});
