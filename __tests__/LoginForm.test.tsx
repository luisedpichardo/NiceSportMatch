import { LoginForm } from '../src/components/LoginForm';
import { render } from '@testing-library/react-native';

describe('LoginForm', () => {
  test('There is a container in the login form', () => {
    const { getByTestId } = render(<LoginForm />);
    expect(getByTestId('loginContainer')).toBeTruthy();
  });
});
