import { LeftSMatchPrev } from '../src/components/LeftSMatchPrev';
import { render } from '@testing-library/react-native';

describe('Language Options', () => {
  test('There is a container', () => {
    const { getByTestId } = render(
      <LeftSMatchPrev publisher="testone" status="upcoming" />,
    );
    expect(getByTestId('container')).toBeTruthy();
  });

  test('There is an image', () => {
    const { getByTestId } = render(
      <LeftSMatchPrev publisher="testone" status="upcoming" />,
    );
    expect(getByTestId('image')).toBeTruthy();
  });

  test('There is the publisher display ', () => {
    const { getByTestId } = render(
      <LeftSMatchPrev publisher="testone" status="upcoming" />,
    );
    expect(getByTestId('publisherTxt')).toBeTruthy();
  });

  test('There is the status display ', () => {
    const { getByTestId } = render(
      <LeftSMatchPrev publisher="testone" status="upcoming" />,
    );
    expect(getByTestId('statusTxt')).toBeTruthy();
  });
});
