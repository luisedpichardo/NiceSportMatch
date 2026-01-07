import { OpenSettings } from '../src/components/OpenSettings';
import { render } from '@testing-library/react-native';

describe('open settings', () => {
  test('container exists', () => {
    const { getByTestId } = render(<OpenSettings />);
    expect(getByTestId('btnContainer')).toBeTruthy();
  });
});
