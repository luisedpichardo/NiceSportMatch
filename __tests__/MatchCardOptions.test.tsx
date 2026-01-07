import { MatchCardOptions } from '../src/components/MatchCardOptions';
import { render } from '@testing-library/react-native';

describe('Options for the card', () => {
  const match = {
    _id: '33',
    address: {
      lat: 33.23,
      long: 23.32,
    },
    day: 'day',
    publisher: 'testone',
    status: 'upcoming',
    time: 'time',
  };

  test('There is a btn to modify in the component', () => {
    const { getByTestId } = render(
      <MatchCardOptions publisher="sender" own={true} match={match} />,
    );
    expect(getByTestId('modifyBtn')).toBeTruthy();
  });

  test('There is a text within the btn to modify in the component', () => {
    const { getByTestId } = render(
      <MatchCardOptions publisher="sender" own={true} match={match} />,
    );
    expect(getByTestId('modifyTxt')).toBeTruthy();
  });

  test('Showing other component when own is set to false in the component', () => {
    const { getByTestId } = render(
      <MatchCardOptions publisher="sender" own={false} match={match} />,
    );
    expect(getByTestId('otherOpt')).toBeTruthy();
  });
});
