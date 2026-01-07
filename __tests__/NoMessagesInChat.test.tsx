import { NoMessagesInChat } from '../src/components/NoMessagesInChat';
import { render } from '@testing-library/react-native';

describe('No Messages in chat', () => {
  test('container exists', () => {
    const { getByTestId } = render(<NoMessagesInChat someone="testone" />);
    expect(getByTestId('container')).toBeTruthy();
  });
});
