// Async Storage
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

// NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() =>
    Promise.resolve({
      isConnected: true,
      isInternetReachable: true,
    }),
  ),
  useNetInfo: jest.fn(() => ({
    isConnected: true,
    isInternetReachable: true,
  })),
}));

// Firebase Firestore
jest.mock('@react-native-firebase/firestore', () => {
  const firestore = () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        update: jest.fn(),
        get: jest.fn(() =>
          Promise.resolve({
            exists: true,
            data: () => ({}),
          }),
        ),
      })),
      add: jest.fn(),
    })),
    doc: jest.fn(() => ({
      set: jest.fn(),
      update: jest.fn(),
      get: jest.fn(),
    })),
  });
  firestore.FieldValue = {
    serverTimestamp: jest.fn(),
  };
  return firestore;
});

// Firebase Auth
jest.mock('@react-native-firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      currentUser: {
        uid: 'test-user-id',
        email: 'test@example.com',
      },
      signInWithEmailAndPassword: jest.fn(),
      createUserWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChanged: jest.fn(cb => {
        cb({
          uid: 'test-user-id',
          email: 'test@example.com',
        });
        return jest.fn();
      }),
    })),
  };
});

// Mock Crashlytics
jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    log: jest.fn(),
    recordError: jest.fn(),
  });
});

// react-native-device-info (FULL MOCK)
jest.mock('react-native-device-info', () => {
  return {
    isEmulator: jest.fn(() => Promise.resolve(false)),
  };
});

// Firebase Messaging
jest.mock('@react-native-firebase/messaging', () => {
  const messaging = () => ({
    requestPermission: jest.fn(() => Promise.resolve(true)),
    hasPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('mock-fcm-token')),
    deleteToken: jest.fn(() => Promise.resolve()),
    onMessage: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    subscribeToTopic: jest.fn(() => Promise.resolve()),
    unsubscribeFromTopic: jest.fn(() => Promise.resolve()),
  });

  messaging.AuthorizationStatus = {
    NOT_DETERMINED: 0,
    DENIED: 1,
    AUTHORIZED: 2,
    PROVISIONAL: 3,
  };

  return messaging;
});

// Firebase Analytics
jest.mock('@react-native-firebase/analytics', () => {
  return () => ({
    logEvent: jest.fn(),
  });
});

// react-native-image-picker
jest.mock('react-native-image-picker', () => {
  return {
    launchCamera: jest.fn((options, callback) => {
      callback({
        didCancel: false,
        assets: [{ uri: 'file://mock-image.jpg' }],
      });
    }),
    launchImageLibrary: jest.fn((options, callback) => {
      callback({
        didCancel: false,
        assets: [{ uri: 'file://mock-image.jpg' }],
      });
    }),
  };
});

// react-native-fs
jest.mock('react-native-fs', () => {
  return {
    readFile: jest.fn(() => Promise.resolve('mock-file-content')),
  };
});

// react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key, // returns key as translation
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

// useFocusEffect
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useFocusEffect: cb => cb(),
  };
});

// React-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }
  class MockMarker extends React.Component {
    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
  };
});

// Geolocation from react-native-community
jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}));
