import { NoInternetAccess } from '../src/components/NoInternetAccess';
import { render } from '@testing-library/react-native';

describe('No Internet', () => {
  test('container exists', () => {
    const { getByTestId } = render(<NoInternetAccess />);
    expect(getByTestId('cont')).toBeTruthy();
  });
});
