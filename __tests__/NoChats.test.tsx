import { NoChats } from '../src/components/NoChats';
import { render } from '@testing-library/react-native';

describe('No Chats', () => {
  test('container exists', () => {
    const { getByTestId } = render(<NoChats />);
    expect(getByTestId('noChatCont')).toBeTruthy();
  });
});
