import { Loading } from '../src/components/Loading';
import { render } from '@testing-library/react-native';

describe('Loading', () => {
  test('There is a container', () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId('container')).toBeTruthy();
  });

  test('There is the indicator', () => {
    const { getByTestId } = render(<Loading />);
    expect(getByTestId('activityIndicator')).toBeTruthy();
  });
});
