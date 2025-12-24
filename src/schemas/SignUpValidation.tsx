import * as yup from 'yup';

export const signUpValidation = yup.object().shape({
  firstName: yup.string().required('First name is Required'),
  lastName: yup.string().required('Last name is Required'),
  username: yup
    .string()
    .required('Username is Required')
    .matches(
      /^[a-zA-Z0-9]+(?:\\s[a-zA-Z0-9]+)*$/,
      'Input cannot have consecutive spaces, or start/end with a space',
    ),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
