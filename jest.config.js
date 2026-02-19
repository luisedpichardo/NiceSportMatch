module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|zustand|@react-native-firebase)/)',
    // 'node_modules/(?!(jest-)?react-native|@react-native(-community)?|react-redux|@reduxjs|immer|@react-native-firebase|@react-navigation|toastify-react-native|expo(nent)?|@expo(nent)?/.*)',
  ],
};
