import { MatchPrev } from '../src/components/MatchPrev';
import { render } from '@testing-library/react-native';

describe('Match Prev', () => {
  test('container exists', () => {
    const { getByTestId } = render(<MatchPrev match="34" />);
    expect(getByTestId('matchView')).toBeTruthy();
  });

  test('info container exists', () => {
    const { getByTestId } = render(<MatchPrev match="34" />);
    expect(getByTestId('infoContainer')).toBeTruthy();
  });
});
