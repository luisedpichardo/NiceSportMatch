import { ImageProfile } from '../src/components/ImageProfile';
import { render } from '@testing-library/react-native';

describe('Image Profile', () => {
  test('There is an image', () => {
    const { getByTestId } = render(<ImageProfile />);
    expect(getByTestId('image')).toBeTruthy();
  });

  test('There is a container for options in image', () => {
    const { getByTestId } = render(<ImageProfile />);
    expect(getByTestId('optionsBtnsCont')).toBeTruthy();
  });

  test('There is a btn to update image', () => {
    const { getByTestId } = render(<ImageProfile />);
    expect(getByTestId('updateBtn')).toBeTruthy();
  });
});
