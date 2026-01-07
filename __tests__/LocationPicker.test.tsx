import { LocationPicker } from '../src/components/LocationPicker';
import { render } from '@testing-library/react-native';

describe('LocationPicker', () => {
  test('There is a container', () => {
    const { getByTestId } = render(<LocationPicker />);
    expect(getByTestId('container')).toBeTruthy();
  });
});
