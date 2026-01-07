import { ChatInput } from '../src/components/ChatInput';
import { render } from '@testing-library/react-native';

describe('Chat input', () => {
  test('Container exists', () => {
    const { getByTestId } = render(<ChatInput receiver="testone" />);
    expect(getByTestId('container')).toBeTruthy();
  });

  test('Send Button exists', () => {
    const { getByTestId } = render(<ChatInput receiver="testone" />);
    expect(getByTestId('sendMessageBtn')).toBeTruthy();
  });
});
