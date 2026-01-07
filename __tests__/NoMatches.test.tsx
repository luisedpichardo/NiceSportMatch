import { NoMatches } from '../src/components/NoMatches';
import { render } from '@testing-library/react-native';

describe('No Matches', () => {
  test('container exists', () => {
    const { getByTestId } = render(<NoMatches own={true} />);
    expect(getByTestId('container')).toBeTruthy();
  });
});
