const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  withStorybook,
} = require('@storybook/react-native/metro/withStorybook');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Wrap your config with withStorybook
module.exports = withStorybook(
  mergeConfig(getDefaultConfig(__dirname), config),
);
