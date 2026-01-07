import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ImageProfile } from '../src/components/ImageProfile';
import { openLibraryHelper } from '../src/utils/ImageHelpers';

jest.mock('../src/utils/ImageHelpers', () => ({
  openLibraryHelper: jest.fn(),
}));

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

  test('calls openLibrary when button is pressed', async () => {
    const mockUri = 'file://path/to/image.jpg';
    (openLibraryHelper as jest.Mock).mockResolvedValue(mockUri);
    const { getByTestId } = render(<ImageProfile />);
    const chooseBtn = getByTestId('openLib');
    fireEvent.press(chooseBtn);

    await waitFor(() => {
      expect(openLibraryHelper).toHaveBeenCalled();
    });
  });
});
