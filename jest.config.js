module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@react-native-firebase|zustand|toastify-react-native|expo(nent)?|@expo(nent)?/.*|@reduxjs)',
  ],
};
