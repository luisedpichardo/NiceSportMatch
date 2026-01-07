import { MatchNotOwnOpt } from '../src/components/MatchNotOwnOpt';
import { render } from '@testing-library/react-native';

describe('Match not Own options', () => {
  test('options exists', () => {
    const { getByTestId } = render(
      <MatchNotOwnOpt publisher="testone" _id="34" />,
    );
    expect(getByTestId('options')).toBeTruthy();
  });

  test('remove button', () => {
    const { getByTestId } = render(
      <MatchNotOwnOpt publisher="testone" _id="34" />,
    );
    expect(getByTestId('removeBtn')).toBeTruthy();
  });

  test('remove text button', () => {
    const { getByTestId } = render(
      <MatchNotOwnOpt publisher="testone" _id="34" />,
    );
    expect(getByTestId('removeTxt')).toBeTruthy();
  });

  test('open chat button', () => {
    const { getByTestId } = render(
      <MatchNotOwnOpt publisher="testone" _id="34" />,
    );
    expect(getByTestId('openChatBtn')).toBeTruthy();
  });

  test('open chat text button', () => {
    const { getByTestId } = render(
      <MatchNotOwnOpt publisher="testone" _id="34" />,
    );
    expect(getByTestId('openChatTxtBtn')).toBeTruthy();
  });
});
