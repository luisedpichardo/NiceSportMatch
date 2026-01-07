import { SettingsOptions } from '../src/components/SettingsOptions';
import { render } from '@testing-library/react-native';

describe('Settings options', () => {
  test('container exists', () => {
    const { getByTestId } = render(
      <SettingsOptions onPress={true} text="text" />,
    );
    expect(getByTestId('btn')).toBeTruthy();
  });
});
