import * as yup from 'yup';

export const signUpValidation = yup.object().shape({
  firstName: yup.string().required('First name is Required'),
  lastName: yup.string().required('Last name is Required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});
