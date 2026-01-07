import { CustomInput } from '../src/components/CustomInput';
import { render } from '@testing-library/react-native';

describe('Custom Input', () => {
  test('There is a custom input container', () => {
    const { getByTestId } = render(
      <CustomInput
        title="text"
        placeholder="text"
        value={'text'}
        onChangeText={'changeText'}
        secureTextEntry={false}
        keyboardType="default"
        error={false}
        errorMessage=""
      />,
    );
    expect(getByTestId('container')).toBeTruthy();
  });

  test('There is a title in the component', () => {
    const { getByTestId } = render(
      <CustomInput
        title="text"
        placeholder="text"
        value={'text'}
        onChangeText={'changeText'}
        secureTextEntry={false}
        keyboardType="default"
        error={false}
        errorMessage=""
      />,
    );
    expect(getByTestId('titleText')).toBeTruthy();
  });

  test('There is an input field in the component', () => {
    const { getByTestId } = render(
      <CustomInput
        title="text"
        placeholder="text"
        value={'text'}
        onChangeText={'changeText'}
        secureTextEntry={false}
        keyboardType="default"
        error={false}
        errorMessage=""
      />,
    );
    expect(getByTestId('inputField')).toBeTruthy();
  });

  test('There is an error display in the component', () => {
    const { getByTestId } = render(
      <CustomInput
        title="text"
        placeholder="text"
        value={'text'}
        onChangeText={'changeText'}
        secureTextEntry={false}
        keyboardType="default"
        error={true}
        errorMessage=""
      />,
    );
    expect(getByTestId('errorText')).toBeTruthy();
  });

  test('There is not an error display in the component', () => {
    const { queryByTestId } = render(
      <CustomInput
        title="text"
        placeholder="text"
        value={'text'}
        onChangeText={'changeText'}
        secureTextEntry={false}
        keyboardType="default"
        error={false}
        errorMessage=""
      />,
    );
    expect(queryByTestId('errorText')).toBeFalsy();
  });
});
