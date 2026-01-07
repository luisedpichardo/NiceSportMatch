import { RigthSMatchPrev } from '../src/components/RightSMatchPrev';
import { render } from '@testing-library/react-native';

describe('open settings', () => {
  test('container exists', () => {
    const { getByTestId } = render(<RigthSMatchPrev day={true} time="text" />);
    expect(getByTestId('container')).toBeTruthy();
  });
});
