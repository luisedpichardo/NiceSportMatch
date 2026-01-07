import { LanguageOpt } from '../src/components/LanguageOpt';
import { render } from '@testing-library/react-native';

describe('Language Options', () => {
  test('There is a btn', () => {
    const { getByTestId } = render(
      <LanguageOpt onPress={() => console.log('test')} text="language" />,
    );
    expect(getByTestId('btn')).toBeTruthy();
  });

  test('There is a text', () => {
    const { getByTestId } = render(
      <LanguageOpt onPress={() => console.log('test')} text="language" />,
    );
    expect(getByTestId('txt')).toBeTruthy();
  });
});
